---
title: Hexo Tips
tags:
  - [Hexo]
date: 2021-01-27 04:04:56
---

## タグでフィルタリングしてページを分けたい
日誌がHomeに並んでいるのが嫌だったので分けた。メモ書きが並ぶのも見目が悪い。
### 前提
Hexo+NexT環境

### 手順
1. 公式の pagination をもってきて、ちょろっと弄る。

```
  const { format: _format, layout, data, perPage, includeTag, excludeTag } = Object.assign({
    format: 'page/%d/',
    layout: ['archive', 'index'],
    data: {},
    perPage: 10,
    includeTag: null,
    excludeTag: null
  }, options);

  const usePosts = Object.create(posts);
  usePosts.data = usePosts.data.sort((a, b) => a.date.isBefore(b.date) ? 1 : a.date.isAfter(b.date) ? -1 : 0 )
  if (includeTag !== null) {
    usePosts.data = usePosts.data.filter(a => a.tags.data.some(tag => tag.name == includeTag));
    usePosts.length = usePosts.data.length;
  }
  if (excludeTag !== null) {
    usePosts.data = usePosts.data.filter(a => !a.tags.data.some(tag => tag.name == excludeTag));
    usePosts.length = usePosts.data.length;
  }
  const length = usePosts.data.length;
```

適当に`posts`を弄ってフィルタリングする。コピーはしておかないとデータを破壊するので注意。

2. pagination を生成時フックにかけて、特定ディレクトリ以下にページ分けしたデータを入れる。

```
var pagination = require('./lib/pagination');
hexo.extend.generator.register('home', function(locals){
  // hexo-pagination makes an index.html for the /archives route
  return pagination('home', locals.posts, {
    perPage: 10,
    layout: ['index'],
    excludeTag: 'Diary'
  });
});
hexo.extend.generator.register('diary', function(locals){
  // hexo-pagination makes an index.html for the /archives route
  return pagination('diary', locals.posts, {
    perPage: 10,
    layout: ['diary', 'archive', 'index'],
    includeTag: 'Diary'
  });
});
```

今回は考えるのが面倒だったので`next/scripts/events/index.js`にべた書き。これで`Diary`タグの有無でフィルタリングしてページわけできる。

3. `_config.yml`のmenuのhomeやdiaryをそのディレクトリにしておく。

```
menu:
  home: /home/ || fa fa-home
  archives: /archives/ || fa fa-archive
  tags: /tags/ || fa fa-tags
  diary: /diary/ || fa fa-archive
```

ついでに`diary`用のlayoutファイルをindexからコピペして作っておく。


## リンク
- [使える変数](https://hexo.io/docs/variables#Site-Variables)
  - njk いじる時には使う
- [Generator](https://hexo.io/api/generator.html)
  - 生成時フック
- [pagination](https://github.com/hexojs/hexo-pagination)
  - 元ネタ