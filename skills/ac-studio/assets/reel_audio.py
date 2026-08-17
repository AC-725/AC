"""
AC — Reel Creator · sound design synth (synced SFX layer, not a music bed).

Cues are defined RELATIVE to each scene's start, so the track retimes itself:
  default scene starts  A 0.0  B 2.6  C 5.0  D 7.5  E 9.6   (DUR 11.7s)
match reel.template.html's SCENES block. If you retime SCENES in the template
(see references/variants.md), pass the new starts here — do NOT edit the cues:

  python3 reel_audio.py master.wav --scenes A=0,B=5.2,C=10.3,D=15.4,E=19.7 --dur 24

Within-scene offsets stay fixed (intro animations keep their attack; longer
scenes simply hold), which matches how the template stretches.
Requires numpy:  pip install numpy --break-system-packages
Usage: python3 reel_audio.py [out.wav] [--scenes A=..,B=..,C=..,D=..,E=..] [--dur S]
"""
import numpy as np, wave, sys

# ---- args ----
OUT='master.wav'; SCN={'A':0.0,'B':2.6,'C':5.0,'D':7.5,'E':9.6}; DUR=11.7
args=sys.argv[1:]
i=0
while i<len(args):
    a=args[i]
    if a=='--scenes':
        i+=1
        for kv in args[i].split(','):
            k,v=kv.split('='); SCN[k.strip().upper()]=float(v)
    elif a=='--dur':
        i+=1; DUR=float(args[i])
    else:
        OUT=a
    i+=1

SR=48000; N=int(SR*DUR)
master=np.zeros((N,2))

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
def s_tick(dur=0.035):
    n=int(SR*dur); return attack(np.sin(2*np.pi*2700*np.arange(n)/SR)*env_exp(n,0.007),1)
def s_pop(dur=0.14):
    n=int(SR*dur); f=np.linspace(760,300,n)
    return attack(np.sin(2*np.pi*np.cumsum(f)/SR)*env_exp(n,0.05)*0.9+noise(n)*env_exp(n,0.006)*0.5,1)
def s_impact(dur=0.55):
    n=int(SR*dur); f=np.linspace(95,45,n)
    return attack(np.sin(2*np.pi*np.cumsum(f)/SR)*env_exp(n,0.17)+noise(n)*env_exp(n,0.02)*0.4,2)
def s_riser(dur=1.0):
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

WH,CL,TK,PO,IM,RI,DI,ST=s_whoosh(),s_click(),s_tick(),s_pop(),s_impact(),s_riser(),s_ding(),s_stamp()

def place(snd,t,gain=1.0,pan=0.0,haas=0.0):
    i=int(t*SR)
    if i>=N or i<0: return
    seg=snd[:max(0,N-i)]; l=gain*(1-max(0,pan)); r=gain*(1+min(0,pan))
    master[i:i+len(seg),0]+=seg*l
    if haas>0:
        j=i+int(haas*SR); s2=snd[:max(0,N-j)]; master[j:j+len(s2),1]+=s2*r
    else: master[i:i+len(seg),1]+=seg*r

A,B,C,D,E=SCN['A'],SCN['B'],SCN['C'],SCN['D'],SCN['E']

# ---- CUES (relative to scene starts) ----
# A — loud open: punch on the thesis, then the big number counts up and locks
place(IM,A+0.02,0.5); place(WH,A+0.05,0.45,haas=0.012)
tt=A+0.5; dt=0.14
while tt<A+1.5: place(TK,tt,0.30); dt=max(0.03,dt*0.84); tt+=dt
place(IM,A+1.52,0.55); place(DI,A+1.6,0.32)
# B — reframe: whoosh in, strike on the old reading, pop on the new one
place(WH,B,0.5,haas=0.012)
place(s_whoosh(0.3),B+0.52,0.4)               # strike swipe
place(PO,B+0.95,0.5)                          # the flip pops
place(TK,B+1.5,0.28); place(TK,B+1.72,0.26)
# C — proof: stat counts up, impact, source stamp
place(WH,C,0.5,haas=0.012); place(RI,C+0.15,0.4)
tt=C+0.3
while tt<C+1.4: place(TK,tt,0.26); tt+=0.11
place(IM,C+1.42,0.6); place(ST,C+1.66,0.7)    # source stamp
# D — the rule / callback: hit on the takeaway
place(WH,D,0.5,haas=0.012); place(IM,D+0.36,0.52); place(DI,D+0.92,0.4)
# E — CTA + loop
place(WH,E,0.34); place(DI,E+0.12,0.5); place(PO,E+0.45,0.45); place(TK,E+1.25,0.3)

# ambient air bed (very low)
t=np.arange(N)/SR
bed=np.convolve(noise(N),np.ones(400)/400,mode='same')
fade=np.clip(np.minimum(t/1.0,(DUR-t)/1.0),0,1)
bed=bed*(0.5+0.5*np.sin(2*np.pi*0.16*t))*fade*0.035
sub=0.02*np.sin(2*np.pi*np.cumsum(np.full(N,55.0))/SR)*fade
master[:,0]+=bed+sub; master[:,1]+=bed+sub

peak=np.max(np.abs(master)); master=master/peak*0.95
master=np.tanh(master*1.05)/np.tanh(1.05)*0.95
data=(np.clip(master,-1,1)*32767).astype(np.int16)
with wave.open(OUT,'w') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data.tobytes())
print('wrote',OUT,round(len(data)/SR,2),'s · scenes',{k:SCN[k] for k in 'ABCDE'})
