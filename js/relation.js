var width = 600;
var height = 500;
// nodeの定義。ここを増やすと楽しい。
var nodes = [
  {
    id: 0,
    label: "marvel",
    r: 1,
    image: "images/marvel.jpg",
    memo: "spidey",
    memo2: "少年の心を失わない"
  },
  {
    id: 1,
    label: "yurikya",
    r: 1,
    image: "images/yurikya.jpg",
    memo: "ゆりきゃわいい",
    memo2: "おもろー山下"
  },
  {
    id: 2,
    label: "monster",
    r: 1,
    image: "images/monster.jpg",
    memo: "L4SwebS同期",
    memo2: "apple愛"
  },
  {
    id: 3,
    label: "razona",
    r: 1,
    image: "images/razona.jpg",
    memo: "黄金世代の７期",
    memo2: ""
  },
  {
    id: 4,
    label: "nett",
    r: 1,
    image: "images/nett.jpg",
    memo: "イケメソ",
    memo2: "これからよろしくお願いします"
  },
  {
    id: 5,
    label: "ryujin",
    r: 1,
    image: "images/ryujin.jpg",
    memo: "WebDのボス",
    memo2: "辛いの大好き！！"
  }
];

var radius = 20;
// node同士の紐付け設定。実用の際は、ここをどう作るかが難しいのかも。
var links = [
  { source: 0, target: 1 },
  { source: 0, target: 2 },
  { source: 0, target: 3 },
  { source: 0, target: 4 },
  { source: 0, target: 5 }
];

// forceLayout自体の設定はここ。ここをいじると楽しい。
var force = d3.layout
  .force()
  .nodes(nodes)
  .links(links)
  .size([width, height])
  .distance(100) // node同士の距離
  .friction(0.9) // 摩擦力(加速度)的なものらしい。
  .linkDistance(150)
  .charge(10) // 寄っていこうとする力。推進力(反発力)というらしい。
  .gravity(0.1) // 画面の中央に引っ張る力。引力。
  .start();

// svg領域の作成
var svg = d3
  .select("#contents3")
  .append("svg")
  .attr({ width: width, height: height });

// link線の描画(svgのline描画機能を利用)
var link = svg
  .selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .style({
    stroke: "#ccc",
    "stroke-width": 1
  });

// nodesの描画(今回はsvgの円描画機能を利用)
var node = svg
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("r", function(d) {
    return d.r;
  })
  .style({
    fill: "orange"
  })
  .call(force.drag);

//ユーザーイメージ追加
var userImg = svg
  .selectAll("a")
  .data(nodes)
  .enter()
  .append("image")
  .attr({
    class: "userImg",
    "xlink:href": function(d) {
      return d.image;
    }, //ノード用画像の設定
    x: -50,
    y: -50,
    width: "100px",
    height: "100px"
  })
  .call(force.drag);

// nodeのラベル周りの設定
var label = svg
  .selectAll("text")
  .data(nodes)
  .enter()
  .append("text")
  .attr({
    "text-anchor": "middle",
    fill: "white",
    "font-size": "15px"
  })
  .text(function(data) {
    return data.label;
  });

// tickイベント(力学計算が起こるたびに呼ばれるらしいので、座標追従などはここで)
force.on("tick", function() {
  link.attr({
    x1: function(data) {
      return data.source.x;
    },
    y1: function(data) {
      return data.source.y;
    },
    x2: function(data) {
      return data.target.x;
    },
    y2: function(data) {
      return data.target.y;
    }
  });
  node.attr({
    cx: function(data) {
      return data.x;
    },
    cy: function(data) {
      return data.y;
    }
  });

  // labelも追随するように
  label.attr({
    x: function(data) {
      return data.x;
    },
    y: function(data) {
      return data.y + 50;
    }
  });
  userImg.attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  });
  node
    .each(collide(0.5))
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    });
});

var padding = radius * 5; // separation between circles

function collide(alpha) {
  var quadtree = d3.geom.quadtree(force.nodes());
  return function(d) {
    var rb = 2 * radius + padding,
      nx1 = d.x - rb,
      nx2 = d.x + rb,
      ny1 = d.y - rb,
      ny2 = d.y + rb;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && quad.point !== d) {
        var x = d.x - quad.point.x,
          y = d.y - quad.point.y,
          l = Math.sqrt(x * x + y * y);
        if (l < rb) {
          l = ((l - rb) / l) * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}
