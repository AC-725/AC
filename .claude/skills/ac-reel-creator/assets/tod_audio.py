"""
AC — Tool of the Day · sound design synth.
Generates a royalty-free SFX track (whoosh, click, type, tick, pop, impact, riser,
chime, stamp) + a very low ambient bed, with every cue placed at the fixed scene
timestamps used by reel.template.html. Output: master.wav (48kHz stereo).

If you change the SCENES timings in reel.template.html, update the cue times below
so the sound stays in sync. Requires numpy:  pip install numpy --break-system-packages
Usage: python synth_audio.py [out.wav]
"""
import numpy as np, wave, sys

SR=48000; DUR=31.6; N=int(SR*DUR)
master=np.zeros((N,2))
OUT=sys.argv[1] if len(sys.argv)>1 else 'master.wav'

def env_exp(n,tau): return np.exp(-(np.arange(n)/SR)/tau)
def attack(x,ms=3):
    a=int(SR*ms/1000)
    if 0<a<len(x): x[:a]*=np.linspace(0,1,a)
    return x
def lp_sweep(x,a0,a1):
    a=np.linspace(a0,a1,len(x)); y=np.empty_like(x); yp=0.0
    for n in range(len(x)): yp+=a[n]*(x[n]-yp); y[n]=yp
    return y
def noise(n): return np.random.uniform(-1,1,n)

def s_whoosh(dur=0.42):
    n=int(SR*dur); x=lp_sweep(noise(n),0.02,0.35); e=np.sin(np.linspace(0,np.pi,n))**1.4
    return attack(x*e,4)
def s_click(dur=0.05):
    n=int(SR*dur); return attack(noise(n)*env_exp(n,0.010)*0.8+0.4*np.sin(2*np.pi*2600*np.arange(n)/SR)*env_exp(n,0.012),1)
def s_type(dur=0.05):
    n=int(SR*dur); return attack(noise(n)*env_exp(n,0.009)*0.6+0.3*np.sin(2*np.pi*1500*np.arange(n)/SR)*env_exp(n,0.010),1)
def s_tick(dur=0.035):
    n=int(SR*dur); return attack(np.sin(2*np.pi*2700*np.arange(n)/SR)*env_exp(n,0.007),1)
def s_pop(dur=0.14):
    n=int(SR*dur); f=np.linspace(760,300,n)
    return attack(np.sin(2*np.pi*np.cumsum(f)/SR)*env_exp(n,0.05)*0.9+noise(n)*env_exp(n,0.006)*0.5,1)
def s_impact(dur=0.55):
    n=int(SR*dur); f=np.linspace(95,45,n)
    return attack(np.sin(2*np.pi*np.cumsum(f)/SR)*env_exp(n,0.17)+noise(n)*env_exp(n,0.02)*0.4,2)
def s_riser(dur=1.1):
    n=int(SR*dur); x=lp_sweep(noise(n),0.01,0.22); e=np.linspace(0,1,n)**1.6
    sub=0.3*np.sin(2*np.pi*np.cumsum(np.linspace(70,150,n))/SR)*e
    return attack(x*e*0.7+sub,5)
def s_ding(dur=0.9):
    n=int(SR*dur); t=np.arange(n)/SR; x=np.zeros(n)
    for f,a,tau in [(1200,1,0.34),(1806,0.7,0.28),(2400,0.5,0.20),(3010,0.3,0.14)]:
        x+=a*np.sin(2*np.pi*f*t)*env_exp(n,tau)
    return attack(x/2.5,2)
def s_stamp(dur=0.3):
    n=int(SR*dur); f=np.linspace(150,60,n)
    return attack(np.sin(2*np.pi*np.cumsum(f)/SR)*env_exp(n,0.09)*0.9+noise(n)*env_exp(n,0.03)*0.7,1)

WH,CL,TY,TK,PO,IM,RI,DI,ST=s_whoosh(),s_click(),s_type(),s_tick(),s_pop(),s_impact(),s_riser(),s_ding(),s_stamp()

def place(snd,t,gain=1.0,pan=0.0,haas=0.0):
    i=int(t*SR)
    if i>=N: return
    seg=snd[:max(0,N-i)]; l=gain*(1-max(0,pan)); r=gain*(1+min(0,pan))
    master[i:i+len(seg),0]+=seg*l
    if haas>0:
        j=i+int(haas*SR); s2=snd[:max(0,N-j)]; master[j:j+len(s2),1]+=s2*r
    else: master[i:i+len(seg),1]+=seg*r

# ---- CUES (absolute seconds; scene starts A0 B4.85 C8.85 D12.65 E17.35 F23.85 G27.15) ----
# A hook + build
place(WH,0.05,0.5,haas=0.012); place(PO,0.20,0.35)
for k,tt in enumerate(np.arange(0.40,1.52,0.11)): place(TY,tt,0.22,pan=(-0.15 if k%2 else 0.15))
place(WH,1.72,0.30)
for tt,g in [(1.95,0.4),(2.15,0.4),(2.40,0.4),(2.55,0.4),(2.75,0.55)]: place(PO,tt,g)
place(DI,2.80,0.35); place(IM,3.05,0.5); place(IM,3.32,0.32)
# B number + stamp
place(WH,4.90,0.5,haas=0.012); place(PO,5.15,0.35)
tt=5.15; dt=0.16
while tt<6.5: place(TK,tt,0.30); dt=max(0.028,dt*0.82); tt+=dt
place(IM,6.55,0.62); place(ST,7.45,0.7)
# C icon grid
place(WH,8.90,0.5,haas=0.012)
for tt in [9.20,9.55,9.90,10.25]: place(PO,tt,0.5)
# D chart
place(WH,12.70,0.5,haas=0.012); place(RI,12.90,0.42)
tt=12.95
while tt<14.02: place(TK,tt,0.26); tt+=0.11
place(IM,14.08,0.6); place(DI,14.18,0.45)
# E steps
place(WH,17.40,0.5,haas=0.012)
for ct,dtk in [(17.75,17.92),(19.45,19.62),(21.15,21.32)]: place(CL,ct,0.42); place(TK,dtk,0.3)
# F rule
place(WH,23.90,0.5,haas=0.012); place(s_whoosh(0.3),24.28,0.4); place(PO,24.75,0.5); place(IM,25.05,0.5)
# G cta
place(WH,27.20,0.32); place(DI,27.45,0.5); place(PO,28.05,0.45); place(DI,28.15,0.3)

# ambient air bed (very low)
t=np.arange(N)/SR
bed=np.convolve(noise(N),np.ones(400)/400,mode='same')
fade=np.clip(np.minimum(t/1.2,(DUR-t)/1.2),0,1)
bed=bed*(0.5+0.5*np.sin(2*np.pi*0.13*t))*fade*0.035
sub=0.02*np.sin(2*np.pi*np.cumsum(np.full(N,55.0))/SR)*fade
master[:,0]+=bed+sub; master[:,1]+=bed+sub

peak=np.max(np.abs(master)); master=master/peak*0.95
master=np.tanh(master*1.05)/np.tanh(1.05)*0.95
data=(np.clip(master,-1,1)*32767).astype(np.int16)
with wave.open(OUT,'w') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data.tobytes())
print('wrote',OUT,round(len(data)/SR,2),'s')
