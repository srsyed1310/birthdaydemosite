"""Bundles the project into one self-contained HTML file (dist/birthday.html).
Useful for sharing as a single file. Run:  python3 build.py
"""
import os, re

root = os.path.dirname(os.path.abspath(__file__))
rd = lambda p: open(os.path.join(root, p), encoding='utf8').read()

index = rd('index.html')
body = index[index.index('<!--BODY-->') + len('<!--BODY-->'): index.index('<!--/BODY-->')]
body = re.sub(r'<script src="[^"]+"></script>\s*', '', body)
css = rd('css/style.css')
order = ['config', 'utils', 'art', 'fx', 'music', 'scratch', 'app']
js = '\n'.join(rd('js/%s.js' % n) for n in order)
title = re.search(r'<title>(.*?)</title>', index).group(1)
fonts = re.search(r'<link href="(https://fonts\.googleapis\.com/css2[^"]+)"', index).group(1)

out = ('<title>%s</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n'
       '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
       '<link href="%s" rel="stylesheet">\n<style>\n%s\n</style>\n%s\n<script>\n%s\n</script>\n') % (title, fonts, css, body.strip(), js)

os.makedirs(os.path.join(root, 'dist'), exist_ok=True)
open(os.path.join(root, 'dist', 'birthday.html'), 'w', encoding='utf8').write(out)
print('dist/birthday.html', len(out), 'bytes')
