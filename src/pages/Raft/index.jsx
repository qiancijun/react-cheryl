import axios from 'axios';
import React from 'react'
import serverSvg from '../../assets/imgs/server.svg'
import "./index.scss"

export default function Raft() {
  const canvasRef = React.useRef();
  const containerRef = React.useRef();
  // const [peers, setPeers] = React.useState(new Array());
  let peers = [];

  React.useEffect(() => {
    getRaftPeers();
      return () => {

      }
    }, []);

  function getRaftPeers() {
    axios.get("/peers").then(
      ({ data }) => {
        peers = data.data.data;
        updateCanvas();
      },
      err => { console.log(err) }
    );
  }

  function updateCanvas() {
    const canvas = canvasRef.current;
    canvas.height = containerRef.current.offsetHeight;
    canvas.width = containerRef.current.offsetWidth;
    const context = canvas.getContext('2d');
    // 清除画布内容
    context.clearRect(0, 0, canvas.width, canvas.height);
    // 加载图像
    // const server = new Image();
    // server.onload = () => {
    //   context.drawImage(server, 0, 0, server.width, server.width);
    // }
    // server.src = serverSvg;
    // drawServer(context, 0, 0);
    // 设置文字属性
    context.font = '16px "微软雅黑“';
    context.textBaseline = "top";
    context.textAlign = "center";

    drawPeers(canvas, context);
  }

  function drawPeers(canvas, context) {
    let totalCnt = peers.length;
    let x = canvas.width;
    let y = canvas.height;
    if (totalCnt === 1) {
      drawServer(context, x >> 1, y >> 1, peers[0]);
    } else if (totalCnt <= 9) {
      let idx = 1;
      let four = x >> 2;
      for (let i = 0; i < totalCnt; i++) {
        if (peers[i].isLeader) {
          drawServer(context, x >> 1, y >> 1, peers[i]);
        } else {
          if (idx <= 4) {
            drawServer(context, idx * four, y >> 3, peers[i]);
            drawLine(context, {x:x>>1, y:y>>1}, {x:idx * four, y:y >> 3});
          }
          idx++;
        }
      }
    }
  }

  function drawServer(context, x, y, info) {
    console.log(info);
    const server = new Image();
    server.onload = () => {
      context.drawImage(server, x - 32, y - 32, server.width, server.width);
    }
    server.src = serverSvg;
    context.fillText(info.serverAddress, x , y + 32);
    context.fillText(info.isLeader ? "Leader" : "Follower", x , y + 50);
    context.fillText(info.serverId, x , y - 50);
  }

  function drawLine(context, begin, end) {
    context.lineWidth = 4;
    context.beginPath();
    context.setLineDash([20, 5]);
    context.moveTo(begin.x, begin.y - 32);
    context.lineTo(end.x, end.y + 32);
    context.stroke();
  }

  return (
    <div className="raft" ref={containerRef}>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
