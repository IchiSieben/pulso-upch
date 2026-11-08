# WCAG 2.x contrast check for the Cayetano palette tokens used in index.html, app/src/styles.css and expo/.
# Exit code = number of text pairs below 4.5:1 (AA, normal text). Gold is decorative only and never carries text on light backgrounds.
import sys
def L(h):
    h=h.lstrip('#'); c=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    c=[x/12.92 if x<=0.03928 else ((x+0.055)/1.055)**2.4 for x in c]
    return .2126*c[0]+.7152*c[1]+.0722*c[2]
def cr(a,b):
    x,y=sorted([L(a),L(b)],reverse=True); return (x+.05)/(y+.05)
themes={
'light':dict(bg='#ffffff',bg2='#f5f5f7',fg='#1d1d1f',muted='#5a5a5f',faint='#6e6e73',accent='#B03437',brand='#B03437',brandfg='#ffffff',amberbg='#fdf6e7',amber='#8a5d00',calm='#2f7d5b',gold='#F3C72D'),
'dark':dict(bg='#000000',bg2='#161617',fg='#f5f5f7',muted='#a1a1a6',faint='#8e8e93',accent='#F08A8C',brand='#B03437',brandfg='#ffffff',amberbg='#2a2214',amber='#f0c46c',calm='#6cc79a',gold='#F3C72D'),
}
pairs=[('amber','bg'),('accent','amberbg'),('fg','bg'),('fg','bg2'),('muted','bg'),('muted','bg2'),('faint','bg'),('faint','bg2'),('accent','bg'),('accent','bg2'),('brandfg','brand'),('amber','amberbg'),('fg','amberbg'),('muted','amberbg'),('calm','bg'),('calm','bg2'),('gold','bg')]
# Student-selectable accents (demo, docs/DESIGN_SYSTEM.md §2): brand fill with white text, accent text on bg/bg2.
ACCENTS={'granate':('#B03437','#B03437','#F08A8C'),'petroleo':('#1F5F7A','#1F5F7A','#7CC4E0'),'salvia':('#2F6B4F','#2F6B4F','#86C9A6'),'grafito':('#3A3A3F','#3A3A3F','#C7C7CC')}
bad=0
for n,(br,al,ad) in ACCENTS.items():
    for t,acc in (('light',al),('dark',ad)):
        v=themes[t]
        for a,b,lab in ((acc,v['bg'],'accent/bg'),(acc,v['bg2'],'accent/bg2'),('#ffffff',br,'white/brand')):
            r=cr(a,b); ok=r>=4.5; bad+=not ok
            print(f"{t:5} {n:9} {lab:12} {r:5.2f} {'ok' if ok else 'FAIL'}")
for t,v in themes.items():
    for a,b in pairs:
        r=cr(v[a],v[b]); need=4.5
        ok = r>=need or a=='gold'
        bad+= not ok
        print(f"{t:5} {a:8}/{b:8} {r:5.2f} {'ok' if r>=need else ('decor' if a=='gold' else 'FAIL')}")
sys.exit(bad)
