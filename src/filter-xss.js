import xss from 'xss';

export default new xss.FilterXSS({
  whiteList: {
    a: ['href', 'target', 'style', 'class'],
    u: ['style', 'class'],
    br: ['style', 'class'],
    b: ['style', 'class'],
    i: ['style', 'class'],
    ol: ['style', 'class'],
    ul: ['style', 'class'],
    li: ['style', 'class'],
    p: ['style', 'class'],
    ins: ['style', 'class'],
    sub: ['style', 'class'],
    sup: ['style', 'class'],
    div: ['style', 'class'],
    em: ['style', 'class'],
    strong: ['style', 'class'],
    span: ['style', 'class'],
  },
});
