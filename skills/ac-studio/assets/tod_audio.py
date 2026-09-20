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

SR=48000; DUR=23.5; N=int(SR*DUR)
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

# ---- CUES (absolute seconds) ----
# RETIMED 2026-08-11 (Day 27) with the SCENES map in tod.template.html.
# Scene starts: A0 B3.25 C6.55 D9.70 E12.75 F17.10 G19.75  (was A0 B4.85 C8.85
# D12.65 E17.35 F23.85 G27.15). Deltas are PER SCENE, not one constant:
#   A 0.00 - B -1.60 - C -2.30 - D -2.95 - E -4.60 - F -6.75 - G -7.40
# Scene C's pops and scene E's step cues were additionally respread to match the
# new visual stagger (C cards 0.55s apart, E steps 1.35s apart).

# A hook + build (unchanged - scene A keeps its timing, only its OUT point moved)
place(WH,0.05,0.5,haas=0.012); place(PO,0.20,0.35)
for k,tt in enumerate(np.arange(0.40,1.52,0.11)): place(TY,tt,0.22,pan=(-0.15 if k%2 else 0.15))
place(WH,1.72,0.30)
for tt,g in [(1.35,0.4),(1.55,0.4),(1.80,0.4),(1.95,0.4),(2.15,0.55)]: place(PO,tt,g)
place(DI,2.20,0.35); place(IM,2.45,0.5); place(IM,3.28,0.32)

# B oversized number + stamp
place(WH,3.30,0.5,haas=0.012); place(PO,3.55,0.35)
tt=3.55; dt=0.16
while tt<4.90: place(TK,tt,0.30); dt=max(0.028,dt*0.82); tt+=dt
place(IM,4.95,0.62); place(ST,5.40,0.7)

# C four build cards - respread to 0.55s spacing
place(WH,6.60,0.5,haas=0.012)
for tt in [6.90,7.45,8.00,8.55]: place(PO,tt,0.5)

# D old-vs-now chart; the caption pop now lands late, with the visual
place(WH,9.75,0.5,haas=0.012); place(RI,9.95,0.42)
tt=10.00
while tt<11.07: place(TK,tt,0.26); tt+=0.11
place(IM,11.13,0.6); place(DI,11.23,0.45); place(PO,11.65,0.45)

# E three steps - 1.35s apart
place(WH,12.80,0.5,haas=0.012)
for ct,dtk in [(13.15,13.32),(14.25,14.42),(15.35,15.52)]: place(CL,ct,0.42); place(TK,dtk,0.3)

# F the rule
place(WH,17.15,0.5,haas=0.012); place(s_whoosh(0.3),17.53,0.4); place(PO,18.00,0.5); place(IM,18.30,0.5)

# G CTA + loop
place(WH,19.80,0.32); place(DI,20.05,0.5); place(PO,20.65,0.45); place(DI,20.75,0.3)

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
