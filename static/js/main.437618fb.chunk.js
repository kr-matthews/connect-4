(this["webpackJsonpconnect-4"]=this["webpackJsonpconnect-4"]||[]).push([[0],{24:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),c=n(12),a=n.n(c),i=n(5),s=n(2),u=n(13),l=n.n(u),d=(n(24),n(0));var b=function(e){var t=e.children;return Object(d.jsx)("div",{className:"header",children:t})};var f=function(e){var t=e.children,n=e.self;return Object(d.jsxs)("div",{className:"playerInfo headerBlock "+(n?"self":"opponent"),children:[Object(d.jsx)("h3",{children:n?"You":"Opponent"}),t]})};var j=function(e){var t=e.editable,n=e.name,o=e.setName,c=Object(r.useState)(!1),a=Object(s.a)(c,2),i=a[0],u=a[1];function l(){var e=""===n?"Nameless":n.trim();o(e),u(!1)}return Object(d.jsx)("div",{children:i?Object(d.jsx)("input",{autoFocus:!0,type:"text",value:n,placeholder:"Name",onChange:function(e){e.target.value.length<=20&&o(e.target.value)},onKeyDown:function(e){"Enter"===e.key&&l()},onBlur:l}):t?Object(d.jsx)("button",{onClick:function(){u(!0)},children:n}):n})};var h=function(e){var t=e.editable,n=e.colour,r=e.setColour;return Object(d.jsxs)("div",{children:["Colour:"," ",t?Object(d.jsx)("input",{type:"color",value:n,onChange:function(e){var t=e.target.value;r(t)}}):Object(d.jsx)("input",{type:"color",disabled:!0,value:n})]})};var p=function(e){var t=e.children;return Object(d.jsxs)("div",{className:"options headerBlock",children:[Object(d.jsx)("h3",{children:"Options"}),t]})};var m=function(e){var t=e.usingGradient,n=e.setUsingGradient;return Object(d.jsxs)("div",{children:["Gradient on"," ",Object(d.jsxs)("select",{value:t.toString(),onChange:function(e){n(e.target.value)},children:[Object(d.jsx)("option",{value:"all",children:"all"}),Object(d.jsx)("option",{value:"my",children:"your"}),Object(d.jsx)("option",{value:"their",children:"their"}),Object(d.jsx)("option",{value:"no",children:"no"})]})," ","pieces."]})};var O=function(e){var t=e.themeType,n=e.toggleTheme,r=t.charAt(0).toUpperCase()+t.slice(1);return Object(d.jsxs)("div",{children:[Object(d.jsx)("button",{onClick:n,children:r})," theme."]})};var v=function(e){var t=e.soundIsOn,n=e.toggleSound;return Object(d.jsxs)("div",{children:["Sound is ",Object(d.jsx)("button",{onClick:n,children:t?"on":"off"}),"."]})},g=n(3),y=n.n(g),w=n(4);var x=function(e){var t=e.createRoom,n=Object(r.useState)("alternate"),o=Object(s.a)(n,2),c=o[0],a=o[1];function i(e){a(e.target.value)}return Object(d.jsxs)("div",{className:"option",children:[Object(d.jsx)("h3",{children:"Create an Online Room"}),Object(d.jsx)("p",{children:"To play a friend remotely, create a room. You'll be given a code to share with them."}),Object(d.jsxs)("div",{children:["Select who will go first in rematches:",Object(d.jsxs)("form",{children:[["Alternate","Loser","Winner","Random"].map((function(e){return Object(d.jsxs)("label",{children:[Object(d.jsx)("input",{type:"radio",value:e.toLowerCase(),checked:c===e.toLowerCase(),onChange:i}),e]},e)})),Object(d.jsx)("button",{onClick:function(e){e.preventDefault(),t(c)},children:"Create Room"})]})]})]})};var k=function(e){var t=e.joinRoom,n=Object(r.useState)(""),o=Object(s.a)(n,2),c=o[0],a=o[1];return Object(d.jsxs)("div",{className:"option",children:[Object(d.jsx)("h3",{children:"Join an Online Room"}),Object(d.jsx)("p",{children:"If a friend has given you a room code, use that code to join their room."}),Object(d.jsxs)("div",{children:["Enter 4-character room code:",Object(d.jsxs)("form",{children:[Object(d.jsx)("input",{type:"text",value:c,placeholder:"paste room code",onChange:function(e){a(e.target.value.toUpperCase().trim())}}),Object(d.jsx)("br",{}),Object(d.jsx)("button",{onClick:function(e){e.preventDefault(),c&&t(c)},children:"Join Room"})]})]})]})};var A=function(e){var t=e.playLocally;return Object(d.jsxs)("div",{className:"option",children:[Object(d.jsx)("h3",{children:"Local Multi-Player"}),Object(d.jsx)("p",{children:"To play a friend on the same screen as you, start a local game."}),Object(d.jsx)("form",{children:Object(d.jsx)("button",{onClick:function(e){e.preventDefault(),t()},children:"Play Locally"})})]})};var M=function(e){var t=e.playComputer;return Object(d.jsxs)("div",{className:"option",children:[Object(d.jsx)("h3",{children:"Play Computer"}),Object(d.jsx)("p",{children:"If you don't have a friend to play against, there is a computer opponent available."}),Object(d.jsx)("form",{children:Object(d.jsx)("button",{onClick:function(e){e.preventDefault(),t()},children:"Play Computer"})})]})},C=["#FF0000","#FF69B4","#FF8C00","#FFD700","#FF00FF","#228B22","#0000FF","#8B4513","#C0C0C0"];function R(){return C[Math.floor(Math.random()*C.length)]}function S(e){var t=function(e,t,n){var r=Math.min(e,t,n),o=Math.max(e,t,n),c=o-r,a=o+r,i=(o+r)/2;if(0===c)return[0,0,i];var s=((o-e)/6+c/2)/c,u=((o-t)/6+c/2)/c,l=((o-n)/6+c/2)/c,d=e===o?l-u:t===o?1/3+s-l:n===o?2/3+u-s:"N/A";return[d<0?d+1:d>1?d-1:d,i<.5?c/a:c/(2-a),i]}(parseInt(e.substring(1,3),16)/255,parseInt(e.substring(3,5),16)/255,parseInt(e.substring(5,7),16)/255),n=Object(s.a)(t,3),r=n[0],o=function(e,t,n){if(0===t)return[n,n,n];var r=n<.5?n*(1+t):n+t-t*n,o=2*n-r;return[I(o,r,e+1/3),I(o,r,e),I(o,r,e-1/3)]}(r>.5?r-.5:r+.5,n[1],1-n[2]),c=Object(s.a)(o,3),a=c[0],i=c[1],u=c[2];return"#"+N(Math.round(255*a).toString(16)).toUpperCase()+N(Math.round(255*i).toString(16)).toUpperCase()+N(Math.round(255*u).toString(16)).toUpperCase()}function N(e){return 2===e.length?e:"0"+e}function I(e,t,n){var r=n<0?n+1:n>1?n-1:n;return 6*r<1?e+6*(t-e)*r:2*r<1?t:3*r<2?e+6*(2/3-r)*(t-e):e}n(27);var E="Could not successfully check room occupancy.\nMay not be connected to the network.";var T=function(e){var t=e.setOpponent,n=e.setPlayType,r=e.setRoomCode,o=e.setIsOwner,c=e.setRestartMethod,a=e.network;function i(){return(i=Object(w.a)(y.a.mark((function e(t){var n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.hereNow({channels:[t]});case 3:return n=e.sent,e.abrupt("return",n.totalOccupancy);case 7:throw e.prev=7,e.t0=e.catch(0),alert(E),console.error("Couldn't get room occupancy.",e.t0),e.t0;case 12:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}var s=function(e,t,n,r,o,c){function a(){return i.apply(this,arguments)}function i(){return(i=Object(w.a)(y.a.mark((function e(){var t,n,r,o;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t="ABCDEFGHJKMNPQRSTUVXYZ23456789",n="",r=-1,e.prev=3;case 4:for(n="",o=0;o<4;o++)n+=t.charAt(Math.floor(Math.random()*t.length));return e.next=8,c(n);case 8:r=e.sent;case 9:if(r>0){e.next=4;break}case 10:return e.abrupt("return",n);case 13:throw e.prev=13,e.t0=e.catch(3),console.error("Couldn't generate room code.",e.t0),e.t0;case 17:case"end":return e.stop()}}),e,null,[[3,13]])})))).apply(this,arguments)}function s(){return(s=Object(w.a)(y.a.mark((function e(c){var i;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a();case 3:i=e.sent,r(!0),o(c),n(i),t("online"),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Couldn't create room.",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function u(){return(u=Object(w.a)(y.a.mark((function e(a){var i;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c(a);case 3:0===(i=e.sent)?alert("No room with code "+a+" currently exists."):1===i?(r(!1),o(null),n(a),t("online")):alert("The room with code "+a+" already has two players."),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Couldn't join room.",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}return{createRoom:function(e){return s.apply(this,arguments)},joinRoom:function(e){return u.apply(this,arguments)},playLocally:function(){e({name:"Player II",colour:R(),type:"local"}),t("local")},playComputer:function(){e({name:"Computron 40 5000",colour:R(),type:"computer"}),t("computer")}}}(t,n,r,o,c,(function(e){return i.apply(this,arguments)})),u=s.createRoom,l=s.joinRoom,b=s.playLocally,f=s.playComputer;return Object(d.jsxs)("div",{className:"lobby",children:[Object(d.jsx)("h2",{children:"Lobby"}),Object(d.jsx)("p",{children:"Welcome to the Connect 4 lobby."}),Object(d.jsx)(x,{createRoom:u}),Object(d.jsx)(k,{joinRoom:l}),Object(d.jsx)(A,{playLocally:b}),Object(d.jsx)(M,{playComputer:f})]})};n(28);var F=function(e){var t=e.resultHistory,n=e.headings;return Object(d.jsxs)("div",{className:"results",children:[Object(d.jsxs)("div",{className:"result left side",children:[Object(d.jsxs)("div",{children:[n[0],":"]}),Object(d.jsx)("div",{children:t.wins})]}),Object(d.jsxs)("div",{className:"result middle",children:[Object(d.jsxs)("div",{children:[n[1],":"]}),Object(d.jsx)("div",{children:t.draws})]}),Object(d.jsxs)("div",{className:"result right side",children:[Object(d.jsxs)("div",{children:[n[2],":"]}),Object(d.jsx)("div",{children:t.loses})]})]})};n(29);var B=function(e){var t=e.roomCode,n=e.isOwner,r=e.hasOpponent,o=e.restartMethod,c=e.resultHistory,a=e.kickOpponent,i=e.closeRoom,s=e.leaveRoom,u="In this room, "+("random"===o?"the first player of subsequent games is selected randomly.":"alternate"===o?"players alternate playing first in subsequent games.":"the "+o+" of a game will go first for the next game. (In the event of a draw, the same player will go first.)"),l=function(){var e=Object(w.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.clipboard.writeText(t);case 2:alert("Room code "+t+" copied to clipboard.");case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.jsxs)(d.Fragment,{children:[r&&Object(d.jsx)(F,{resultHistory:c,headings:["Wins","Draws","Loses"]}),r?n?Object(d.jsx)("p",{children:"You created and are in control of this room."}):Object(d.jsx)("p",{children:"Your opponent created and has control of this room."}):n?Object(d.jsxs)("p",{children:["Waiting for an opponent to join your room. Share your room code"," ",Object(d.jsx)("button",{onClick:l,children:t})," with a friend."]}):Object(d.jsx)("p",{children:"Waiting for opponent information to be fetched. (If this message persists, then something has gone wrong.)."}),o&&Object(d.jsx)("p",{children:u}),Object(d.jsxs)("div",{className:r?"":"exitRoom",children:[n?Object(d.jsx)("button",{onClick:i,children:"Close Room"}):Object(d.jsx)("button",{onClick:s,children:"Leave Room"}),n&&r&&Object(d.jsx)("button",{onClick:a,children:"Kick Opponent"})]})]})};n(30);function J(e){var t=e.row,n=e.columns,o=(e.viewer,e.isViewersTurn),c=e.makeMove,a=e.colours,i=Object(r.useContext)(we),s=t.map((function(e,t){var r=e.piece,s=(e.wouldWin,e.isWinner);return Object(d.jsx)(W,{handleClick:function(){return c(t)},colour:a[r],useGradient:null!==r&&("all"===i||"my"===i&&0===r||"their"===i&&1===r),isHighlight:s,isClickable:o&&!n[t].isFull},t)}));return Object(d.jsx)("tr",{children:s})}function W(e){var t=e.handleClick,n=e.colour,o=e.useGradient,c=e.isHighlight,a=e.isClickable,i=Object(r.useContext)(xe),s=i.background,u=i.foreground,l=n||s,b=c?S(l):l,f={backgroundColor:l,borderColor:b},j={borderColor:b,backgroundImage:"radial-gradient("+l+","+l+"70)"},h=a?"clickable cell":"cell",p={borderColor:u};return Object(d.jsx)("td",{className:h,style:p,onClick:t,children:Object(d.jsx)("span",{className:"piece",style:o?j:f})})}var G=function(e){for(var t=e.viewer,n=e.positions,o=e.columns,c=e.isViewersTurn,a=e.colours,i=e.makeMove,s=Object(r.useContext)(xe).foreground,u=[],l=n.length-1;l>-1;l--)u.push(Object(d.jsx)(J,{row:n[l],columns:o,viewer:t,isViewersTurn:c,makeMove:i,colours:a},l));return Object(d.jsx)("table",{className:"board",style:{backgroundColor:s},children:Object(d.jsx)("tbody",{children:u})})};n(31);var Z=function(e){var t=e.sharingScreen,n=e.viewer,r=e.isOwner,o=e.names,c=e.gameStatus,a=e.winner,i=e.toPlayNext,s=e.forfeit,u=e.startNewGame,l=e.hasRestartChoice,b="waiting"===c?"the game":" a new game";return Object(d.jsxs)("div",{className:"gameFooter",children:[Object(d.jsx)("div",{children:function(){if(t)switch(c){case"won":return"Congratulations "+o[a]+", you won!";case"forfeit":return o[1-a]+" forfeit the game -- "+o[a]+" wins.";case"draw":return"It's a draw.";case"ongoing":return"It's "+o[i]+"'s turn to play.";case"waiting":return"The game hasn't started yet.";default:return console.error("Error: ",c),"Something has gone wrong. Apologies."}else switch(c){case"won":return a===n?"Congratulations, you won!":"You lost.";case"forfeit":return a===n?"Your opponent has forfeit the game -- you win.":"You lost by forfeiting the game.";case"draw":return"It's a draw.";case"ongoing":return n===i?"It's your turn to drop a piece.":"Waiting for your opponent to play.";case"waiting":return"The game hasn't started yet.";default:return console.error("Error: ",c),"Something has gone wrong. Apologies."}}()}),Object(d.jsx)("div",{children:"ongoing"===c?Object(d.jsx)("button",{onClick:function(){return s(n)},children:"Forfeit"}):r?l?Object(d.jsxs)(d.Fragment,{children:["To start ",b,", select who will go first:"," ",Object(d.jsx)("button",{onClick:function(){return u(0)},children:o[0]}),Object(d.jsx)("button",{onClick:function(){return u(1)},children:o[1]})]}):Object(d.jsxs)(d.Fragment,{children:["Start ",b,": ",Object(d.jsx)("button",{onClick:u,children:"Start"})]}):Object(d.jsxs)(d.Fragment,{children:["Waiting for your opponent to start ",b,"."]})})]})},D=[[0,1],[1,1],[1,0],[1,-1]];function P(e){for(var t=e.pieces,n=e.rows,r=e.cols,o=e.lineLen,c=[],a=[],i=[],u=function(e){for(var n=[],c=function(r){var c=[{},{}];D.forEach((function(n,a){var i=Object(s.a)(n,2),u=i[0],l=i[1];c[u][l]=function(e,n,r,c){for(var a=[0,0],i=0;i<o;i++){var s=e+i*r,u=n+i*c;if(!v(s,u))return{isInBounds:!1};null!==t[s][u]&&(a[t[s][u]]+=1)}return{isInBounds:!0,isWinner:a[0]===o||a[1]===o,counts:a}}(e,r,u,l)})),n.push(c)},a=0;a<r;a++)c(a);i.push(n)},l=0;l<n;l++)u(l);for(var d=0;d<n;d++){for(var b=[],f=0;f<r;f++)b.push(g(d,f));a.push(b)}for(var j=function(e){for(var t=function(t){D.forEach((function(n,r){var c=Object(s.a)(n,2),u=c[0],l=c[1],d=i[e][t][u][l];if(d.isInBounds){var b="fillable";if(d.counts[0]+d.counts[1]===o)b="full";else for(var f=0;f<o;f++)for(var j=e+f*u,h=t+f*l,p=0;p<j;p++){a[p][h].isHot&&(b="unfillable")}d.fill=b}}))},n=0;n<r;n++)t(n)},h=0;h<n;h++)j(h);for(var p=0;p<r;p++)for(var m=0;m<n;m++){if(null===a[m][p].piece){c.push({isFull:!1,firstOpenRow:m});break}m===n-1&&c.push({isFull:!0})}function O(e,t){var n=[];return D.forEach((function(r){for(var c=Object(s.a)(r,2),a=c[0],u=c[1],l=1-o;l<=0;l++){var d=e+l*a,b=t+l*u;v(d,b)&&i[d][b][a][u].isInBounds&&n.push(i[d][b][a][u])}})),n}function v(e,t){return 0<=e&&e<n&&0<=t&&t<r}function g(e,n){var r=t[e][n],c=function(e,n){var r=[!1,!1];null===t[e][n]&&O(e,n).forEach((function(e){var t=e.counts;t[0]===o-1?r[0]=!0:t[1]===o-1&&(r[1]=!0)}));return r}(e,n),a=c.every((function(e){return e})),u=function(e,n){if(null===t[e][n])return!1;for(var r=0;r<D.length;r++)for(var c=Object(s.a)(D[r],2),a=c[0],u=c[1],l=1-o;l<=0;l++){var d=e+l*a,b=n+l*u;if(v(d,b)){var f=i[d][b][a][u];if(f.isInBounds&&f.isWinner)return!0}}return!1}(e,n);return{row:e,col:n,piece:r,wouldWin:c,isHot:a,isWinner:u}}return{positions:a,lines:i,columns:c,linesThrough:O,positionsOn:function(e,t,n,r){var c=[];if(i[e][t][n][r].isInBounds)for(var s=0;s<o;s++)c.push(a[e+s*n][t+s*r]);return c}}}function H(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=[],o=0;o<e;o++){for(var c=[],a=0;a<t;a++)c.push(n);r.push(c)}return r}function U(e,t){var n=Object(i.a)({},e);switch(t.type){case"reset":return{moveHistory:[],pieces:H(t.rows,t.cols)};case"move":var r=t.player,o=t.row,c=t.col;return n.moveHistory.push({player:r,row:o,col:c}),n.pieces[t.row][t.col]=t.player,n;case"undo":return 0===e.moveHistory.length?e:(n.moveHistory.pop(),n[t.row][t.col]=null,n);default:return console.error("gameStatesReducer has no matching case: ",t),e}}function Y(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:7,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:4,o=Object(r.useState)(null),c=Object(s.a)(o,2),a=c[0],i=c[1],u=Object(r.useState)(!0),l=Object(s.a)(u,2),d=l[0],b=l[1],f=Object(r.useState)(null),j=Object(s.a)(f,2),h=j[0],p=j[1],m=Object(r.useReducer)(U,{moveHistory:[],pieces:H(e,t)}),O=Object(s.a)(m,2),v=O[0],g=v.moveHistory,y=v.pieces,w=O[1],x={pieces:y,rows:e,cols:t,lineLen:n},k=P(x),A=k.positions,M=k.columns,C=0===g.length?null:g[g.length-1],R=g.length>0&&A[C.row][C.col].isWinner,S=M.every((function(e){return e.isFull})),N=R?"won":S?"draw":"ongoing",I=d?"waiting":null!==h?"forfeit":N,E="forfeit"===I?1-h:"won"===I?C.player:null,T="ongoing"!==I?null:0===g.length?a:1-C.player;function F(){b(!0),p(null),i(null),w({type:"reset",rows:e,cols:t})}function B(n){p(null),w({type:"reset",rows:e,cols:t}),i((function(e){var t=Math.floor(2*Math.random());if(null===e)return 0===n?0:1===n?1:t;switch(n){case"alternate":return 1-e;case"winner":return null!==E?E:e;case"loser":return null!==E?1-E:e;case"random":return t;case 0:return 0;case 1:return 1;default:return console.error("Couldn't select first player.",n),0}})),b(!1)}function J(e,t){var n=M[e];if("ongoing"===I&&t===T&&!n.isFull){var r=n.firstOpenRow;w({type:"move",player:t,row:r,col:e})}}return{gameStatus:I,prevMove:C,toPlayFirst:a,toPlayNext:T,winner:E,resetGame:F,startGame:B,placePiece:J,setForfeiter:p,keyAttributes:x,boardStats:k}}var L=n.p+"static/media/water_dropwav-6707.104e70a9.mp3",Q=n.p+"static/media/good-6081.4c04bbc5.mp3",V=n.p+"static/media/failure-drum-sound-effect-2mp3-7184.7b134939.mp3",X=n.p+"static/media/mixkit-retro-game-notification-212.b222ebf0.wav";function z(e,t,n,o){var c=Object(r.useContext)(ke).setSoundToPlay;Object(r.useEffect)((function(){0===o?c(Q):1===o&&c(e?Q:V)}),[o,c,e]),Object(r.useEffect)((function(){"draw"===t&&c(X)}),[t,c]),Object(r.useEffect)((function(){0!==n||e||c(L)}),[n,c,e])}var K=n.p+"static/media/success-1-6297.fd2c2fea.mp3",q=n.p+"static/media/chime-sound-7143.09264db5.mp3",_=n.p+"static/media/notification-sound-7062.d73a4897.mp3",$=n.p+"static/media/fist-punch-or-kick-7171.1d430a44.mp3",ee=n.p+"static/media/power-down-7103.2164432c.mp3";var te=n(19);function ne(e,t){var n=Object(te.a)(e);switch(t.type){case"add":n.push(t.message);break;case"remove":n.shift();break;default:console.error("No match for reduceMessageQueue.",t)}return n}function re(e,t,n,o,c,a,i,u,l,d,b){var f=Object(r.useReducer)(ne,[]),j=Object(s.a)(f,2),h=j[0],p=j[1],m=Object(r.useCallback)((function(e){p({type:"add",message:e})}),[]);Object(r.useEffect)((function(){h.length>0&&(h[0].uuid!==n&&function(e){switch(e.type){case"restartMethod":d(e.restartMethod);break;case"playerInfo":c((function(t){return{name:e.name||t.name,colour:e.colour||t.colour,type:"remote"}}));break;case"start":i(1-e.toPlayFirst);break;case"move":u(e.col,1);break;case"forfeit":l(1);break;case"kick":alert("The owner of the room kicked you out."),b();break;case"close":alert("The owner of the room left and so the room has closed."),b();break;case"leave":o&&(alert("Your opponent left."),a());break;default:console.error("Unhandled message.",e)}}(h[0]),p({type:"remove"}))})),Object(r.useEffect)((function(){return e.subscribe({channels:[t],withPresence:!0}),function(){e.unsubscribe({channels:[t]})}}),[e,t,b]),Object(r.useEffect)((function(){var t={message:function(e){m(e.message)}};return e.addListener(t),function(){e.removeListener(t)}}),[e,m,b])}var oe={wins:0,draws:0,loses:0};function ce(e,t){if("reset"===t.type)return oe;var n=Object(i.a)({},e);return n[t.type+"s"]+=1,n}function ae(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=Object(r.useReducer)(ce,oe),c=Object(s.a)(o,2),a=c[0],i=c[1],u=Object(r.useCallback)((function(){i({type:"reset"})}),[]);return Object(r.useEffect)((function(){0===t?i({type:"win"}):1===t&&i({type:"lose"})}),[t]),Object(r.useEffect)((function(){"draw"===e&&i({type:"draw"})}),[e]),Object(r.useEffect)((function(){n||u()}),[n,u]),{resultHistory:a,resetResults:u}}function ie(e,t,n,o,c,a,s,u,l){var d=null!==c,b=Y(),f=b.boardStats,j=b.gameStatus,h=b.prevMove,p=b.toPlayFirst,m=b.toPlayNext,O=b.winner,v=b.resetGame,g=b.startGame,x=b.placePiece,k=b.setForfeiter;z(!1,j,m,O);var A=function(e,t){var n=Object(r.useContext)(ke).setSoundToPlay;return Object(r.useEffect)((function(){e&&n(t?q:_)}),[n,e,t]),Object(r.useEffect)((function(){return n(e?K:Q),function(){n(e?ee:_)}}),[n,e]),{playKickSound:function(){n($)}}}(o,d),M=A.playKickSound;function C(){a(null),v()}return function(e,t,n,o,c,a,s,u,l,d){var b=Object(r.useCallback)(function(){var r=Object(w.a)(y.a.mark((function r(o){return y.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.publish({message:Object(i.a)(Object(i.a)({},o),{},{uuid:n.uuid}),channel:t});case 3:r.next=9;break;case 5:r.prev=5,r.t0=r.catch(0),console.error("Couldn't publish message.",r.t0),alert("Could not send '"+o.type+"' message to opponent.\nYou may be out of sync with your opponent.\nConsider closing the room and creating a new one, if you haven't already.");case 9:case"end":return r.stop()}}),r,null,[[0,5]])})));return function(e){return r.apply(this,arguments)}}(),[e,t,n.uuid]);Object(r.useEffect)((function(){!c&&o||b({type:"playerInfo",name:n.name,colour:n.colour})}),[b,o,c,n.name,n.colour]),Object(r.useEffect)((function(){o&&c&&b({type:"restartMethod",restartMethod:d})}),[b,o,c,d]),Object(r.useEffect)((function(){o&&"ongoing"===a&&b({type:"start",toPlayFirst:u})}),[b,o,a,u]),Object(r.useEffect)((function(){s&&0===s.player&&b({type:"move",col:s.col})}),[b,s]),Object(r.useEffect)((function(){"forfeit"===a&&1===l&&b({type:"forfeit"})}),[b,a,l]),Object(r.useEffect)((function(){o&&!c&&b({type:"kick"})}),[b,o,c]),Object(r.useEffect)((function(){return function(){b({type:o?"close":"leave"})}}),[o,b])}(e,t,n,o,d,j,h,p,O,s),re(e,t,n.uuid,d,a,C,g,x,k,u,l),{resultHistory:ae(j,O,d).resultHistory,boardStats:f,gameStatus:j,winner:O,toPlayNext:m,startNewGame:function(){g(s)},makeMove:function(e){0===m&&x(e,0)},forfeit:k,kickOpponent:function(){C(),M()}}}var se=function(e){var t=e.roomCode,n=e.player,r=e.isOwner,o=e.opponent,c=e.setOpponent,a=e.restartMethod,i=e.setRestartMethod,s=e.unmountRoom,u=ie(e.network,t,n,r,o,c,a,i,s),l=u.resultHistory,b=u.boardStats,f=u.gameStatus,j=u.winner,h=u.toPlayNext,p=u.startNewGame,m=u.makeMove,O=u.forfeit,v=u.kickOpponent,g=b.positions,y=b.columns;return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(B,{roomCode:t,isOwner:r,hasOpponent:null!==o,restartMethod:a,resultHistory:l,kickOpponent:v,closeRoom:s,leaveRoom:s}),o&&Object(d.jsx)(G,{viewer:0,positions:g,columns:y,isViewersTurn:0===h,colours:[n.colour,o.colour],makeMove:m}),o&&Object(d.jsx)(Z,{sharingScreen:!1,viewer:0,isOwner:r,names:[n.name,o.name],gameStatus:f,winner:j,toPlayNext:h,forfeit:O,startNewGame:p,hasRestartChoice:!1})]})};var ue=function(e){var t=e.sharingScreen,n=e.names,r=e.resultHistory,o=e.unmount,c=t?"You're playing locally with a friend on the same screen.":"You're playing against the computer.",a=t?[n[0]+" Wins","Draws",n[1]+" Wins"]:["Wins","Draws","Loses"];return Object(d.jsxs)("div",{children:[Object(d.jsx)(F,{resultHistory:r,headings:a}),Object(d.jsx)("p",{children:c}),Object(d.jsx)("button",{onClick:o,children:"Return to Lobby"})]})};function le(e,t,n,o,c,a,i){var u=Object(r.useState)(!1),l=Object(s.a)(u,2),d=l[0],b=l[1],f=a.rows,j=a.cols,h=a.lineLen,p=3*h+1,m=i.positions,O=i.columns,v=i.linesThrough,g=function(){var e=0;return O.forEach((function(t){var n=t.isFull,r=t.firstOpenRow;return e+=n?f:r})),e}(),y=O.slice().map((function(e,n){if(e.isFull)return-1;var r=e.firstOpenRow,o={empty:0,dead:0,self:new Array(h).fill(0),opp:new Array(h).fill(0)};v(r,n).forEach((function(e){return function(e,n){n.isWinner;var r=n.counts,o=n.fill;0===r[0]&&0===r[1]?e.empty+=1:"fillable"!==o||r[0]*r[1]>0?e.dead+=1:r[t]>0?e.self[r[t]]+=1:e.opp[r[1-t]]+=1}(o,e)}));var c=o.self[h-1]>0,a=o.opp[h-1]>0,i=r<f-1&&m[r+1][n].wouldWin[1-t],s=r<f-1&&m[r+1][n].wouldWin[t],u=Math.max(3,p*(h-1));if(c)return 3*u;if(a)return 2*u;if(i)return 1;if(s)return 2;var l=o.empty;return o.self.forEach((function(e,t){l+=function(e,t){return 2*e+(e<2?0:e<t-2?1:3)}(t,h)*e})),o.opp.forEach((function(e,t){l+=function(e,t){return 2*e-1+(e<2?0:e<t-2?1:3)}(t,h)*e})),Math.max(3,l)})),w=function(e){var t=-1,n=[];return e.forEach((function(e,r){e>t?(t=e,n=[r]):e===t&&n.push(r)})),n[Math.floor(Math.random()*n.length)]}(y),x=function(e){var t=Math.max(500,3e3*Math.sqrt((g+3)/(f*j+3))),n=-1,r=-1;if(e.forEach((function(e){e>n?(r=n,n=e):e>r&&(r=e)})),-1===r)return 500;var o=Math.min(1,r/n),c=500*Math.random()-250;return Math.min(t,Math.max(500,t*o+c))}(y);Object(r.useEffect)((function(){e&&n&&b(!0)}),[e,n]),Object(r.useEffect)((function(){d&&(console.log(Math.floor(x),y),setTimeout((function(){return o(w)}),x),b(!1))}))}var de=function(e){var t=e.sharingScreen,n=e.player,r=e.opponent,o=e.unmount,c=Y(),a=c.gameStatus,i=c.toPlayNext,s=c.winner,u=c.startGame,l=c.placePiece,b=c.setForfeiter,f=c.keyAttributes,j=c.boardStats,h=j.positions,p=j.columns;z(t,a,i,s);var m=ae(a,s).resultHistory;return le("computer"===r.type,1,1===i,(function(e){return l(e,1)}),0,f,j),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(ue,{sharingScreen:t,names:[n.name,r.name],resultHistory:m,unmount:o}),Object(d.jsx)(G,{viewer:t?i:0,positions:h,columns:p,isViewersTurn:t?null!==i:0===i,colours:[n.colour,r.colour],makeMove:function(e){l(e,t?i:0)}}),Object(d.jsx)(Z,{sharingScreen:t,viewer:t?i:0,isOwner:!0,names:[t?n.name:"You",r.name],gameStatus:a,winner:s,toPlayNext:i,forfeit:b,startNewGame:u,hasRestartChoice:!0})]})},be=(n(32),n.p+"static/media/website-logo.2a15d8d0.svg");function fe(e){var t=e.url,n=e.image,r=e.description;return Object(d.jsxs)("a",{href:t,className:"link-tooltip-container",target:"_blank",rel:"noopener noreferrer",children:[Object(d.jsx)("img",{className:"link-image",src:n,alt:""}),Object(d.jsx)("span",{className:"link-tooltip",children:r})]})}var je,he=function(e){var t=e.gitHubLink,n=e.themeType,r=[["Personal Website","https://kr-matthews.github.io/",be],["Project Repository",t,"light"===(void 0===n?"light":n)?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEyQTk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE3OEEyQjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTI4OTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTI5OTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+m4QGuQAAAyRJREFUeNrEl21ojWEYx895TDPbMNlBK46IUiNmPvHBSUjaqc0H8pF5+aDUKPEBqU2NhRQpX5Rv5jWlDIWlMCv7MMSWsWwmb3tpXub4XXWdPHvc9/Gc41nu+nedc7/8r/99PffLdYdDPsvkwsgkTBwsA/PADJCnzX2gHTwBt8Hl7p537/3whn04XoDZDcpBlk+9P8AFcAghzRkJwPF4zGGw0Y9QS0mAM2AnQj77FqCzrtcwB1Hk81SYojHK4DyGuQ6mhIIrBWB9Xm7ug/6B/nZrBHBegrkFxoVGpnwBMSLR9EcEcC4qb8pP14BWcBcUgewMnF3T34VqhWMFkThLJAalwnENOAKiHpJq1FZgI2AT6HZtuxZwR9GidSHtI30jOrbawxlVX78/AbNfhHlomEUJJI89O2MqeE79T8/nk8nMBm/dK576hZgmA3cp/R4l9/UeSxiHLVIlNm4nFfT0bxyuIj7LHRTKai+zdJobwMKzcZSJb0ePV5PKN+BqAAKE47UlMnERELMM3EdYP/yrd+XYb2mOiYBiQ8OQnoRBlXrl9JZix7D1pHTazu4MoyBcnYamqAjIMTR8G4FT8LuhLsexXYYjICBiqhQBvYb6fLZIJCjPypVvaOoVAW2WcasCnL2Nq82xHJNSqlCeFcDshaPK0twkAhosjZL31QYw+1rlMpWGMArl23SBsZZO58F2tlJXmjOXS+s4WGvpMiBJT/I2PInZ6lIs9/hBsNS1hS6BG0DSqmYEDRlCXQrmy50P1oDRKTSegmNbUsA0zDMwRhPJXeCE3vWLPQMvan6X8AgIa1vcR4AkGZkDR4ejJ1UHpsaVI0g2LInpOsNFUud1rhxSV+fzC9Woz2EZkWQuja7/B+jUrgtIMpy9YCW4n4K41YfzRneW5E1KJTe4B2Zq1Q5EHEtj4U3AfEzR5SVY4l7QYQPJdN2as7RKBF0BPZqqH4VgMAMBL8Byxr7y8zCZiDlnOcEKIPmUpgB5Z2ww5RdOiiRiNajUmWda5IG6WbhsyY2fx6m8gLcoJDJFkH219M3We1+cnda93pfycZpIJEL/s/wSYADmOAwAQgdpBAAAAABJRU5ErkJggg==":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RERCMUIwOUY4NkNFMTFFM0FBNTJFRTMzNTJEMUJDNDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RERCMUIwOUU4NkNFMTFFM0FBNTJFRTMzNTJEMUJDNDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTJBOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTJCOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jUqS1wAAApVJREFUeNq0l89rE1EQx3e3gVJoSPzZeNEWPKgHoa0HBak0iHiy/4C3WvDmoZ56qJ7txVsPQu8qlqqHIhRKJZceesmhioQEfxTEtsoSpdJg1u/ABJ7Pmc1m8zLwgWTmzcw3L+/te+tHUeQltONgCkyCi2AEDHLsJ6iBMlgHL8FeoqokoA2j4CloRMmtwTmj7erHBXPgCWhG6a3JNXKdCiDl1cidVbXZkJoXQRi5t5BrxwoY71FzU8S4JuAIqFkJ2+BFSlEh525b/hr3+k/AklDkNsf6wTT4yv46KIMNpsy+iMdMc47HNWxbsgVcUn7FmLAzzoFAWDsBx+wVP6bUpp5ewI+DOeUx0Wd9D8F70BTGNjkWtqnhmT1JQAHcUgZd8Lo3rQb1LAT8eJVUfgGvHQigGp+V2Z0iAUUl8QH47kAA1XioxIo+bRN8OG8F/oBjwv+Z1nJgX5jpdzQDw0LCjsPmrcW7I/iHScCAEDj03FtD8A0EyuChHgg4KTlJQF3wZ7WELppnBX+dBFSVpJsOBWi1qiRgSwnOgoyD5hmuJdkWCVhTgnTvW3AgYIFrSbZGh0UW/Io5Vp+DQoK7o80pztWMemZbgxeNwCNwDbw1fIfgGZjhU6xPaJgBV8BdsMw5cbZoHsenwYFxkZzl83xTSKTiviCAfCsJLysH3POfC8m8NegyGAGfLP/VmGmfSChgXroR0RSWjEFv2J/nG84cuKFMf4sTCZqXuJd4KaXFVjEG3+tw4eXbNK/YC9oXXs3O8NY8y99L4BXY5cvLY/Bb2VZ58EOJVcB18DHJq9lRsKr8inyKGVjlmh29mtHs3AHfuhCwy1vXT/Nu2GKQt+UHsGdctyX6eQyNvc+5sfX9Dl7Pe2J/BRgAl2CpwmrsHR0AAAAASUVORK5CYII="]];return Object(d.jsx)("div",{className:"link-footer",children:r.map((function(e){var t=Object(s.a)(e,3),n=t[0],r=t[1],o=t[2];return Object(d.jsx)(fe,{description:n,url:r,image:o},r)}))})},pe=n(14),me=n(15),Oe=Object(me.a)(je||(je=Object(pe.a)(["\n  body {\n      background: ",";\n      color: ",";\n    }\n  "])),(function(e){return e.theme.background}),(function(e){return e.theme.foreground}));function ve(e,t){var n=JSON.parse(localStorage.getItem(e)),o=Object(r.useState)(null===n?t:n),c=Object(s.a)(o,2),a=c[0],i=c[1];function u(t){i(t),localStorage.setItem(e,JSON.stringify(t))}return null===n&&u(a),[a,u]}function ge(e){var t=Object(r.useState)(null),n=Object(s.a)(t,2),o=n[0],c=n[1];return Object(r.useEffect)((function(){o&&e&&new Audio(o).play(),o&&c(null)}),[o,e]),{setSoundToPlay:c}}var ye={light:{type:"light",background:"#F5F5F5",foreground:"#121212"},dark:{type:"dark",background:"#121212",foreground:"#F5F5F5"}},we=Object(r.createContext)("all"),xe=Object(r.createContext)(ye.light),ke=Object(r.createContext)();var Ae=function(){var e=ve("theme",ye.light),t=Object(s.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(null),a=Object(s.a)(c,2),u=a[0],g=a[1];Object(r.useEffect)((function(){return document.body.style.transition="all 0.75s ease-in",document.body.style.transitionProperty="background, color",function(){document.body.style.transition="none",document.body.style.transitionProperty="none"}}),[u]);var y=ve("gradients","all"),w=Object(s.a)(y,2),x=w[0],k=w[1],A=ve("sound",!0),M=Object(s.a)(A,2),C=M[0],S=M[1],N=ge(C).setSoundToPlay,I=ve("name","Nameless"),E=Object(s.a)(I,2),F=E[0],B=E[1],J=ve("colour",R()),W=Object(s.a)(J,2),G=W[0],Z=W[1],D=Object(r.useState)(null),P=Object(s.a)(D,2),H=P[0],U=P[1];function Y(e,t){U((function(n){if(n){var r=Object(i.a)({},n);return r[e]=t,r}}))}var L=Object(r.useState)(null),Q=Object(s.a)(L,2),V=Q[0],X=Q[1],z=Object(r.useCallback)((function(){X(null),U(null),$(null),re(null),ie(null)}),[]),K=Object(r.useState)(null),q=Object(s.a)(K,2),_=q[0],$=q[1],ee=Object(r.useState)(null),te=Object(s.a)(ee,2),ne=te[0],re=te[1],oe=Object(r.useState)(null),ce=Object(s.a)(oe,2),ae=ce[0],ie=ce[1],ue=ve("uuid",function(){for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",t="",n=0;n<64;n++)t+=e[Math.floor(Math.random()*e.length)];return t}()),le=Object(s.a)(ue,1)[0],be=Object(r.useMemo)((function(){return new l.a({publishKey:"pub-c-444b80e2-3dd6-4998-ba4d-fdb8ea2f2d63",subscribeKey:"sub-c-d1ada3dc-38d4-11ec-8182-fea14ba1eb2b",uuid:le})}),[le]);return Object(d.jsx)(we.Provider,{value:x,children:Object(d.jsx)(xe.Provider,{value:n,children:Object(d.jsxs)(ke.Provider,{value:{setSoundToPlay:N},children:[Object(d.jsx)(Oe,{theme:n}),Object(d.jsx)("h1",{children:"Connect 4"}),Object(d.jsxs)(b,{children:[Object(d.jsxs)(f,{self:!0,children:[Object(d.jsx)(j,{editable:!0,name:F,setName:B}),Object(d.jsx)(h,{editable:!0,colour:G,setColour:Z})]}),Object(d.jsxs)(p,{children:[Object(d.jsx)(m,{usingGradient:x,setUsingGradient:k}),Object(d.jsx)(v,{soundIsOn:C,toggleSound:function(){S(!C)}}),Object(d.jsx)(O,{themeType:n.type,toggleTheme:function(){o("light"===n.type?ye.dark:ye.light),g(!0)}})]}),H?Object(d.jsxs)(f,{self:!1,children:[Object(d.jsx)(j,{editable:"local"===V,name:H.name,setName:function(e){return Y("name",e)}}),Object(d.jsx)(h,{editable:"local"===V||"computer"===V,colour:H.colour,setColour:function(e){return Y("colour",e)}})]}):Object(d.jsx)(f,{self:!1})]}),"online"===V?Object(d.jsx)(se,{roomCode:_,player:{name:F,colour:G,uuid:le},isOwner:ne,opponent:H,setOpponent:U,restartMethod:ae,setRestartMethod:ie,unmountRoom:z,network:be}):"local"===V?Object(d.jsx)(de,{sharingScreen:!0,player:{name:F,colour:G},opponent:H,unmount:z}):"computer"===V?Object(d.jsx)(de,{sharingScreen:!1,player:{name:F,colour:G},opponent:H,unmount:z}):Object(d.jsx)(T,{setOpponent:U,setPlayType:X,setRoomCode:$,setIsOwner:re,setRestartMethod:ie,network:be}),Object(d.jsx)(he,{gitHubLink:"https://github.com/kr-matthews/connect-4",themeType:n.type})]})})})};n(37);a.a.render(Object(d.jsx)(o.a.StrictMode,{children:Object(d.jsx)(Ae,{})}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.437618fb.chunk.js.map