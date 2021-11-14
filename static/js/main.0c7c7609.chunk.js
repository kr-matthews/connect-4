(this["webpackJsonpconnect-4"]=this["webpackJsonpconnect-4"]||[]).push([[0],{24:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),c=n(13),a=n.n(c),s=n(5),i=n(2),l=n(14),u=n.n(l),d=(n(24),n(0));var b=function(e){var t=e.children;return Object(d.jsx)("div",{className:"header",children:t})};var j=function(e){var t=e.children,n=e.self;return Object(d.jsxs)("div",{className:"playerInfo headerBlock "+(n?"self":"opponent"),children:[Object(d.jsx)("h3",{children:n?"You":"Opponent"}),t]})};var h=function(e){var t=e.editable,n=e.name,o=e.setName,c=Object(r.useState)(!1),a=Object(i.a)(c,2),s=a[0],l=a[1];function u(){var e=""===n?"Nameless":n.trim();o(e),l(!1)}return Object(d.jsx)("div",{children:s?Object(d.jsx)("input",{autoFocus:!0,type:"text",value:n,placeholder:"Name",onChange:function(e){e.target.value.length<=20&&o(e.target.value)},onKeyDown:function(e){"Enter"===e.key&&u()},onBlur:u}):t?Object(d.jsx)("button",{onClick:function(){l(!0)},children:n}):n})};var p=function(e){var t=e.editable,n=e.colour,r=e.setColour;return Object(d.jsxs)("div",{children:["Colour:"," ",t?Object(d.jsx)("input",{type:"color",value:n,onChange:function(e){var t=e.target.value;r(t)}}):Object(d.jsx)("input",{type:"color",disabled:!0,value:n})]})};var f=function(e){var t=e.children;return Object(d.jsxs)("div",{className:"options headerBlock",children:[Object(d.jsx)("h3",{children:"Options"}),t]})};var m=function(e){var t=e.usingGradient,n=e.setUsingGradient;return Object(d.jsxs)("div",{children:["Gradient on"," ",Object(d.jsxs)("select",{value:t.toString(),onChange:function(e){n(e.target.value)},children:[Object(d.jsx)("option",{value:"all",children:"all"}),Object(d.jsx)("option",{value:"my",children:"your"}),Object(d.jsx)("option",{value:"their",children:"their"}),Object(d.jsx)("option",{value:"no",children:"no"})]})," ","pieces."]})};var O=function(e){var t=e.themeType,n=e.toggleTheme,r=t.charAt(0).toUpperCase()+t.slice(1);return Object(d.jsxs)("div",{children:[Object(d.jsx)("button",{onClick:n,children:r})," theme."]})};var g=function(e){var t=e.soundIsOn,n=e.toggleSound;return Object(d.jsxs)("div",{children:["Sound is ",Object(d.jsx)("button",{onClick:n,children:t?"on":"off"}),"."]})},v=n(3),y=n.n(v),x=n(4);var w=function(e){var t=e.createRoom,n=Object(r.useState)("alternate"),o=Object(i.a)(n,2),c=o[0],a=o[1];function s(e){a(e.target.value)}return Object(d.jsxs)("div",{className:"option",children:[Object(d.jsx)("h3",{children:"Create an Online Room"}),Object(d.jsx)("p",{children:"To play a friend remotely, create a room. You'll be given a code to share with them."}),Object(d.jsxs)("div",{children:["Select who will go first in rematches:",Object(d.jsxs)("form",{children:[["Alternate","Loser","Winner","Random"].map((function(e){return Object(d.jsxs)("label",{children:[Object(d.jsx)("input",{type:"radio",value:e.toLowerCase(),checked:c===e.toLowerCase(),onChange:s}),e]},e)})),Object(d.jsx)("button",{onClick:function(e){e.preventDefault(),t(c)},children:"Create Room"})]})]})]})};var k=function(e){var t=e.joinRoom,n=Object(r.useState)(""),o=Object(i.a)(n,2),c=o[0],a=o[1];return Object(d.jsxs)("div",{className:"option",children:[Object(d.jsx)("h3",{children:"Join an Online Room"}),Object(d.jsx)("p",{children:"If a friend has given you a room code, use that code to join their room."}),Object(d.jsxs)("div",{children:["Enter 4-character room code:",Object(d.jsxs)("form",{children:[Object(d.jsx)("input",{type:"text",value:c,placeholder:"paste room code",onChange:function(e){a(e.target.value.toUpperCase().trim())}}),Object(d.jsx)("br",{}),Object(d.jsx)("button",{onClick:function(e){e.preventDefault(),c&&t(c)},children:"Join Room"})]})]})]})};var A=function(e){var t=e.playLocally;return Object(d.jsxs)("div",{className:"option",children:[Object(d.jsx)("h3",{children:"Local Multi-Player"}),Object(d.jsx)("p",{children:"To play a friend on the same screen as you, start a local game."}),Object(d.jsx)("form",{children:Object(d.jsx)("button",{onClick:function(e){e.preventDefault(),t()},children:"Play Locally"})})]})};var C=function(e){var t=e.playComputer;return Object(d.jsxs)("div",{className:"option",children:[Object(d.jsx)("h3",{children:"Play Computer"}),Object(d.jsx)("p",{children:"If you don't have a friend to play against, there is a computer opponent available."}),Object(d.jsx)("form",{children:Object(d.jsx)("button",{onClick:function(e){e.preventDefault(),t()},children:"Play Computer"})})]})},M=["#FF0000","#FF69B4","#FF8C00","#FFD700","#FF00FF","#228B22","#0000FF","#8B4513","#C0C0C0"];function R(){return M[Math.floor(Math.random()*M.length)]}function N(e){var t=function(e,t,n){var r=Math.min(e,t,n),o=Math.max(e,t,n),c=o-r,a=o+r,s=(o+r)/2;if(0===c)return[0,0,s];var i=((o-e)/6+c/2)/c,l=((o-t)/6+c/2)/c,u=((o-n)/6+c/2)/c,d=e===o?u-l:t===o?1/3+i-u:n===o?2/3+l-i:"N/A";return[d<0?d+1:d>1?d-1:d,s<.5?c/a:c/(2-a),s]}(parseInt(e.substring(1,3),16)/255,parseInt(e.substring(3,5),16)/255,parseInt(e.substring(5,7),16)/255),n=Object(i.a)(t,3),r=n[0],o=function(e,t,n){if(0===t)return[n,n,n];var r=n<.5?n*(1+t):n+t-t*n,o=2*n-r;return[I(o,r,e+1/3),I(o,r,e),I(o,r,e-1/3)]}(r>.5?r-.5:r+.5,n[1],1-n[2]),c=Object(i.a)(o,3),a=c[0],s=c[1],l=c[2];return"#"+S(Math.round(255*a).toString(16)).toUpperCase()+S(Math.round(255*s).toString(16)).toUpperCase()+S(Math.round(255*l).toString(16)).toUpperCase()}function S(e){return 2===e.length?e:"0"+e}function I(e,t,n){var r=n<0?n+1:n>1?n-1:n;return 6*r<1?e+6*(t-e)*r:2*r<1?t:3*r<2?e+6*(2/3-r)*(t-e):e}n(27);var T="Could not successfully check room occupancy.\nMay not be connected to the network.";var E=function(e){var t=e.setOpponent,n=e.setPlayType,r=e.setRoomCode,o=e.setIsOwner,c=e.setRestartMethod,a=e.network;function s(){return(s=Object(x.a)(y.a.mark((function e(t){var n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.hereNow({channels:[t]});case 3:return n=e.sent,e.abrupt("return",n.totalOccupancy);case 7:throw e.prev=7,e.t0=e.catch(0),alert(T),console.error("Couldn't get room occupancy.",e.t0),e.t0;case 12:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}var i=function(e,t,n,r,o,c){function a(){return s.apply(this,arguments)}function s(){return(s=Object(x.a)(y.a.mark((function e(){var t,n,r,o;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t="ABCDEFGHJKMNPQRSTUVXYZ23456789",n="",r=-1,e.prev=3;case 4:for(n="",o=0;o<4;o++)n+=t.charAt(Math.floor(Math.random()*t.length));return e.next=8,c(n);case 8:r=e.sent;case 9:if(r>0){e.next=4;break}case 10:return e.abrupt("return",n);case 13:throw e.prev=13,e.t0=e.catch(3),console.error("Couldn't generate room code.",e.t0),e.t0;case 17:case"end":return e.stop()}}),e,null,[[3,13]])})))).apply(this,arguments)}function i(){return(i=Object(x.a)(y.a.mark((function e(c){var s;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a();case 3:s=e.sent,r(!0),o(c),n(s),t("online"),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("Couldn't create room.",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}function l(){return(l=Object(x.a)(y.a.mark((function e(a){var s;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c(a);case 3:0===(s=e.sent)?alert("No room with code "+a+" currently exists."):1===s?(r(!1),o(null),n(a),t("online")):alert("The room with code "+a+" already has two players."),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Couldn't join room.",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}return{createRoom:function(e){return i.apply(this,arguments)},joinRoom:function(e){return l.apply(this,arguments)},playLocally:function(){e({name:"Player II",colour:R()}),t("local")},playComputer:function(){e({name:"Computron 40 5000",colour:R()}),t("computer")}}}(t,n,r,o,c,(function(e){return s.apply(this,arguments)})),l=i.createRoom,u=i.joinRoom,b=i.playLocally,j=i.playComputer;return Object(d.jsxs)("div",{className:"lobby",children:[Object(d.jsx)("h2",{children:"Lobby"}),Object(d.jsx)("p",{children:"Welcome to the Connect 4 lobby."}),Object(d.jsx)(w,{createRoom:l}),Object(d.jsx)(k,{joinRoom:u}),Object(d.jsx)(A,{playLocally:b}),Object(d.jsx)(C,{playComputer:j})]})};n(28);var F=function(e){var t=e.resultHistory,n=e.headings;return Object(d.jsxs)("div",{className:"results",children:[Object(d.jsxs)("div",{className:"result left side",children:[Object(d.jsxs)("div",{children:[n[0],":"]}),Object(d.jsx)("div",{children:t.wins})]}),Object(d.jsxs)("div",{className:"result middle",children:[Object(d.jsxs)("div",{children:[n[1],":"]}),Object(d.jsx)("div",{children:t.draws})]}),Object(d.jsxs)("div",{className:"result right side",children:[Object(d.jsxs)("div",{children:[n[2],":"]}),Object(d.jsx)("div",{children:t.loses})]})]})};n(29);var J=function(e){var t=e.roomCode,n=e.isOwner,r=e.hasOpponent,o=e.restartMethod,c=e.resultHistory,a=e.kickOpponent,s=e.closeRoom,i=e.leaveRoom,l="In this room, "+("random"===o?"the first player of subsequent games is selected randomly.":"alternate"===o?"players alternate playing first in subsequent games.":"the "+o+" of a game will go first for the next game. (In the event of a draw, the same player will go first.)"),u=function(){var e=Object(x.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.clipboard.writeText(t);case 2:alert("Room code "+t+" copied to clipboard.");case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.jsxs)(d.Fragment,{children:[r&&Object(d.jsx)(F,{resultHistory:c,headings:["Wins","Draws","Loses"]}),r?n?Object(d.jsx)("p",{children:"You created and are in control of this room."}):Object(d.jsx)("p",{children:"Your opponent created and has control of this room."}):n?Object(d.jsxs)("p",{children:["Waiting for an opponent to join your room. Share your room code"," ",Object(d.jsx)("button",{onClick:u,children:t})," with a friend."]}):Object(d.jsx)("p",{children:"Waiting for opponent information to be fetched. (If this message persists, then something has gone wrong.)."}),o&&Object(d.jsx)("p",{children:l}),Object(d.jsxs)("div",{className:r?"":"exitRoom",children:[n?Object(d.jsx)("button",{onClick:s,children:"Close Room"}):Object(d.jsx)("button",{onClick:i,children:"Leave Room"}),n&&r&&Object(d.jsx)("button",{onClick:a,children:"Kick Opponent"})]})]})};n(30);function B(e){var t=e.row,n=e.viewer,o=e.isViewersTurn,c=e.makeMove,a=e.colours,s=Object(r.useContext)(xe),i=t.map((function(e,t){var r=e.player,i=e.isHighlight,l=e.colIsOpen;return Object(d.jsx)(G,{clickHandler:function(){return c(t,n)},colour:a[r],useGradient:null!==r&&("all"===s||"my"===s&&0===r||"their"===s&&1===r),isHighlight:i,isClickable:o&&l},t)}));return Object(d.jsx)("tr",{children:i})}function G(e){var t=e.clickHandler,n=e.colour,o=e.useGradient,c=e.isHighlight,a=e.isClickable,s=Object(r.useContext)(we),i=s.background,l=s.foreground,u=n||i,b=c?N(u):u,j={backgroundColor:u,borderColor:b},h={borderColor:b,backgroundImage:"radial-gradient("+u+","+u+"70)"},p=a?"clickable cell":"cell",f={borderColor:l};return Object(d.jsx)("td",{className:p,style:f,onClick:t,children:Object(d.jsx)("span",{className:"piece",style:o?h:j})})}var D=function(e){for(var t=e.viewer,n=e.board,o=e.isViewersTurn,c=e.colours,a=e.makeMove,s=Object(r.useContext)(we).foreground,i=[],l=n.length-1;l>-1;l--)i.push(Object(d.jsx)(B,{row:n[l],viewer:t,isViewersTurn:o,makeMove:a,colours:c},l));return Object(d.jsx)("table",{className:"board",style:{backgroundColor:s},children:Object(d.jsx)("tbody",{children:i})})};n(31);var Z=function(e){var t=e.sharingScreen,n=e.viewer,r=e.isOwner,o=e.names,c=e.gameStatus,a=e.winner,s=e.toPlayNext,i=e.forfeit,l=e.startNewGame,u=e.hasRestartChoice,b="waiting"===c?"the game":" a new game";return Object(d.jsxs)("div",{className:"gameFooter",children:[Object(d.jsx)("div",{children:function(){if(t)switch(c){case"won":return"Congratulations "+o[a]+", you won!";case"forfeit":return o[1-a]+" forfeit the game -- "+o[a]+" wins.";case"draw":return"It's a draw.";case"ongoing":return"It's "+o[s]+"'s turn to play.";case"waiting":return"The game hasn't started yet.";default:return console.error("Error: ",c),"Something has gone wrong. Apologies."}else switch(c){case"won":return a===n?"Congratulations, you won!":"You lost.";case"forfeit":return a===n?"Your opponent has forfeit the game -- you win.":"You lost by forfeiting the game.";case"draw":return"It's a draw.";case"ongoing":return n===s?"It's your turn to drop a piece.":"Waiting for your opponent to play.";case"waiting":return"The game hasn't started yet.";default:return console.error("Error: ",c),"Something has gone wrong. Apologies."}}()}),Object(d.jsx)("div",{children:"ongoing"===c?Object(d.jsx)("button",{onClick:function(){return i(n)},children:"Forfeit"}):r?u?Object(d.jsxs)(d.Fragment,{children:["To start ",b,", select who will go first:"," ",Object(d.jsx)("button",{onClick:function(){return l(0)},children:o[0]}),Object(d.jsx)("button",{onClick:function(){return l(1)},children:o[1]})]}):Object(d.jsxs)(d.Fragment,{children:["Start ",b,": ",Object(d.jsx)("button",{onClick:l,children:"Start"})]}):Object(d.jsxs)(d.Fragment,{children:["Waiting for your opponent to start ",b,"."]})})]})},W=n(7),P=[[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];function U(e,t,n){for(var r=[],o=0;o<e;o++){for(var c=[],a=0;a<t;a++)c.push("empty"===n?{}:n);r.push(c)}return r}function Y(e,t){for(var n=e.length,r=[e[0].length,e[0][0].length],o=r[0],c=r[1],a=U(o,c,"empty"),s=0;s<o;s++)for(var i=0;i<c;i++){a[s][i]={};for(var l=0;l<n;l++)a[s][i][t[l]]=e[l][s][i]}return a}function H(e,t){var n=Object(W.a)(e);switch(t.type){case"reset":return[];case"addMove":var r=t.player,o=t.row,c=t.col;return n.push({player:r,row:o,col:c}),n;case"undo":return e===[]?e:(n.pop(),n);default:return console.error("moveHistoryReducer didn't match any case.",t),e}}function L(e,t){var n=Object(W.a)(e);switch(t.type){case"reset":return U(t.rows,t.cols,null);case"placePiece":return n[t.row][t.col]=t.player,n;case"undo":return n[t.row][t.col]=null,n;default:return console.error("peicesReducer didn't match any case.",t),e}}function Q(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:7,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:4,o=Object(r.useState)(null),c=Object(i.a)(o,2),a=c[0],s=c[1],l=Object(r.useState)(!0),u=Object(i.a)(l,2),d=u[0],b=u[1],j=Object(r.useState)(null),h=Object(i.a)(j,2),p=h[0],f=h[1],m=Object(r.useReducer)(H,[]),O=Object(i.a)(m,2),g=O[0],v=O[1],y=Object(r.useReducer)(L,U(e,t,null)),x=Object(i.a)(y,2),w=x[0],k=x[1],A=0===g.length?null:g[g.length-1],C=J()?"won":F()?"draw":"ongoing",M=d?"waiting":null!==p?"forfeit":C,R="forfeit"===M?1-p:"won"!==M?null:g[g.length-1].player,N=B(),S=G(),I=Y([w,N,S],["player","isHighlight","colIsOpen"]),T="ongoing"!==M?null:0===g.length?a:1-g[g.length-1].player;function E(t){for(var n=0;n<e;n++)if(null===w[n][t])return n;return null}function F(){for(var n=0;n<t;n++)if(null===w[e-1][n])return!1;return!0}function J(){if(g.length<2*n-1)return!1;for(var e=g[g.length-1],t=e.player,r=e.row,o=e.col,c=0;c<P.length;c++)for(var a=Object(i.a)(P[c],2),s=a[0],l=a[1],u=-3;u<1;u++)if(D(t,r+u*s,o+u*l,s,l))return!0;return!1}function B(){var r=U(e,t,!1);if(g.length<2*n-1)return r;for(var o=g[g.length-1],c=o.player,a=o.row,s=o.col,l=0;l<P.length;l++)for(var u=Object(i.a)(P[l],2),d=u[0],b=u[1],j=1-n;j<1;j++)if(D(c,a+j*d,s+j*b,d,b))for(var h=j;h<j+n;h++)r[a+h*d][s+h*b]=!0;return r}function G(){for(var n=U(e,t),r=0;r<t;r++)for(var o=null===w[e-1][r],c=0;c<e;c++)n[c][r]=o;return n}function D(r,o,c,a,s){for(var i=0;i<n;i++){var l=o+i*a,u=c+i*s;if(0>l||l>=e||0>u||u>=t||w[l][u]!==r)return!1}return!0}function Z(){b(!0),f(null),s(null),v({type:"reset"}),k({type:"reset",rows:e,cols:t})}function W(n){f(null),v({type:"reset"}),k({type:"reset",rows:e,cols:t}),s((function(e){var t=Math.floor(2*Math.random());if(null===e)return 0===n?0:1===n?1:t;switch(n){case"alternate":return 1-e;case"winner":return null!==R?R:e;case"loser":return null!==R?1-R:e;case"random":return t;case 0:return 0;case 1:return 1;default:return console.error("Couldn't select first player.",n),0}})),b(!1)}function Q(e,t){var n=E(e);"ongoing"===M&&t===T&&null!==n&&(v({type:"addMove",player:t,row:n,col:e}),k({type:"placePiece",player:t,row:n,col:e}))}return{board:I,gameStatus:M,prevMove:A,toPlayFirst:a,toPlayNext:T,winner:R,resetGame:Z,startGame:W,placePiece:Q,setForfeiter:f}}var V=n.p+"static/media/water_dropwav-6707.104e70a9.mp3",X=n.p+"static/media/good-6081.4c04bbc5.mp3",z=n.p+"static/media/failure-drum-sound-effect-2mp3-7184.7b134939.mp3",K=n.p+"static/media/mixkit-retro-game-notification-212.b222ebf0.wav";function q(e,t,n,o){var c=Object(r.useContext)(ke).setSoundToPlay;Object(r.useEffect)((function(){0===o?c(X):1===o&&c(e?X:z)}),[o,c,e]),Object(r.useEffect)((function(){"draw"===t&&c(K)}),[t,c]),Object(r.useEffect)((function(){0!==n||e||c(V)}),[n,c,e])}var _=n.p+"static/media/success-1-6297.fd2c2fea.mp3",$=n.p+"static/media/chime-sound-7143.09264db5.mp3",ee=n.p+"static/media/notification-sound-7062.d73a4897.mp3",te=n.p+"static/media/fist-punch-or-kick-7171.1d430a44.mp3",ne=n.p+"static/media/power-down-7103.2164432c.mp3";function re(e,t){var n=Object(W.a)(e);switch(t.type){case"add":n.push(t.message);break;case"remove":n.shift();break;default:console.error("No match for reduceMessageQueue.",t)}return n}function oe(e,t,n,o,c,a,s,l,u,d,b){var j=Object(r.useReducer)(re,[]),h=Object(i.a)(j,2),p=h[0],f=h[1],m=Object(r.useCallback)((function(e){f({type:"add",message:e})}),[]);Object(r.useEffect)((function(){p.length>0&&(p[0].uuid!==n&&function(e){switch(e.type){case"restartMethod":d(e.restartMethod);break;case"playerInfo":c((function(t){return{name:e.name||t.name,colour:e.colour||t.colour}}));break;case"start":s(1-e.toPlayFirst);break;case"move":l(e.col,1);break;case"forfeit":u(1);break;case"kick":alert("The owner of the room kicked you out."),b();break;case"close":alert("The owner of the room left and so the room has closed."),b();break;case"leave":o&&(alert("Your opponent left."),a());break;default:console.error("Unhandled message.",e)}}(p[0]),f({type:"remove"}))})),Object(r.useEffect)((function(){return e.subscribe({channels:[t],withPresence:!0}),function(){e.unsubscribe({channels:[t]})}}),[e,t,b]),Object(r.useEffect)((function(){var t={message:function(e){m(e.message)}};return e.addListener(t),function(){e.removeListener(t)}}),[e,m,b])}var ce={wins:0,draws:0,loses:0};function ae(e,t){if("reset"===t.type)return ce;var n=Object(s.a)({},e);return n[t.type+"s"]+=1,n}function se(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=Object(r.useReducer)(ae,ce),c=Object(i.a)(o,2),a=c[0],s=c[1],l=Object(r.useCallback)((function(){s({type:"reset"})}),[]);return Object(r.useEffect)((function(){0===t?s({type:"win"}):1===t&&s({type:"lose"})}),[t]),Object(r.useEffect)((function(){"draw"===e&&s({type:"draw"})}),[e]),Object(r.useEffect)((function(){n||l()}),[n,l]),{resultHistory:a,resetResults:l}}function ie(e,t,n,o,c,a,i,l,u){var d=null!==c,b=Q(),j=b.board,h=b.gameStatus,p=b.prevMove,f=b.toPlayFirst,m=b.toPlayNext,O=b.winner,g=b.resetGame,v=b.startGame,w=b.placePiece,k=b.setForfeiter;q(!1,h,m,O);var A=function(e,t){var n=Object(r.useContext)(ke).setSoundToPlay;return Object(r.useEffect)((function(){e&&n(t?$:ee)}),[n,e,t]),Object(r.useEffect)((function(){return n(e?_:X),function(){n(e?ne:ee)}}),[n,e]),{playKickSound:function(){n(te)}}}(o,d),C=A.playKickSound;function M(){a(null),g()}return function(e,t,n,o,c,a,i,l,u,d){var b=Object(r.useCallback)(function(){var r=Object(x.a)(y.a.mark((function r(o){return y.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.publish({message:Object(s.a)(Object(s.a)({},o),{},{uuid:n.uuid}),channel:t});case 3:r.next=9;break;case 5:r.prev=5,r.t0=r.catch(0),console.error("Couldn't publish message.",r.t0),alert("Could not send '"+o.type+"' message to opponent.\nYou may be out of sync with your opponent.\nConsider closing the room and creating a new one, if you haven't already.");case 9:case"end":return r.stop()}}),r,null,[[0,5]])})));return function(e){return r.apply(this,arguments)}}(),[e,t,n.uuid]);Object(r.useEffect)((function(){!c&&o||b({type:"playerInfo",name:n.name,colour:n.colour})}),[b,o,c,n.name,n.colour]),Object(r.useEffect)((function(){o&&c&&b({type:"restartMethod",restartMethod:d})}),[b,o,c,d]),Object(r.useEffect)((function(){o&&"ongoing"===a&&b({type:"start",toPlayFirst:l})}),[b,o,a,l]),Object(r.useEffect)((function(){i&&0===i.player&&b({type:"move",col:i.col})}),[b,i]),Object(r.useEffect)((function(){"forfeit"===a&&1===u&&b({type:"forfeit"})}),[b,a,u]),Object(r.useEffect)((function(){o&&!c&&b({type:"kick"})}),[b,o,c]),Object(r.useEffect)((function(){return function(){b({type:o?"close":"leave"})}}),[o,b])}(e,t,n,o,d,h,p,f,O,i),oe(e,t,n.uuid,d,a,M,v,w,k,l,u),{resultHistory:se(h,O,d).resultHistory,board:j,gameStatus:h,winner:O,toPlayNext:m,startNewGame:function(){v(i)},makeMove:function(e){0===m&&w(e,0)},forfeit:k,kickOpponent:function(){M(),C()}}}var le=function(e){var t=e.roomCode,n=e.player,r=e.isOwner,o=e.opponent,c=e.setOpponent,a=e.restartMethod,s=e.setRestartMethod,i=e.unmountRoom,l=ie(e.network,t,n,r,o,c,a,s,i),u=l.resultHistory,b=l.board,j=l.gameStatus,h=l.winner,p=l.toPlayNext,f=l.startNewGame,m=l.makeMove,O=l.forfeit,g=l.kickOpponent;return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(J,{roomCode:t,isOwner:r,hasOpponent:null!==o,restartMethod:a,resultHistory:u,kickOpponent:g,closeRoom:i,leaveRoom:i}),o&&Object(d.jsx)(D,{viewer:0,board:b,isViewersTurn:0===p,colours:[n.colour,o.colour],makeMove:m}),o&&Object(d.jsx)(Z,{sharingScreen:!1,viewer:0,isOwner:r,names:[n.name,o.name],gameStatus:j,winner:h,toPlayNext:p,forfeit:O,startNewGame:f,hasRestartChoice:!1})]})};var ue=function(e){var t=e.sharingScreen,n=e.names,r=e.resultHistory,o=e.unmount,c=t?"You're playing locally with a friend on the same screen.":"You're playing against the computer. (TODO: TEMP: doesn't work yet.)",a=t?[n[0]+" Wins","Draws",n[1]+" Wins"]:["Wins","Draws","Loses"];return Object(d.jsxs)("div",{children:[Object(d.jsx)(F,{resultHistory:r,headings:a}),Object(d.jsx)("p",{children:c}),Object(d.jsx)("button",{onClick:o,children:"Return to Lobby"})]})};var de=function(e){var t=e.sharingScreen,n=e.player,r=e.opponent,o=e.unmount,c=Q(),a=c.board,s=c.gameStatus,i=c.toPlayNext,l=c.winner,u=c.startGame,b=c.placePiece,j=c.setForfeiter;q(t,s,i,l);var h=se(s,l).resultHistory;return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(ue,{sharingScreen:t,names:[n.name,r.name],resultHistory:h,unmount:o}),Object(d.jsx)(D,{viewer:t?i:0,board:a,isViewersTurn:t?null!==i:0===i,colours:[n.colour,r.colour],makeMove:function(e){b(e,t?i:0)}}),Object(d.jsx)(Z,{sharingScreen:t,viewer:t?i:0,isOwner:!0,names:[t?n.name:"You",r.name],gameStatus:s,winner:l,toPlayNext:i,forfeit:j,startNewGame:u,hasRestartChoice:!0})]})},be=(n(32),n.p+"static/media/website-logo.2a15d8d0.svg");function je(e){var t=e.url,n=e.image,r=e.description;return Object(d.jsxs)("a",{href:t,className:"link-tooltip-container",target:"_blank",rel:"noopener noreferrer",children:[Object(d.jsx)("img",{className:"link-image",src:n,alt:""}),Object(d.jsx)("span",{className:"link-tooltip",children:r})]})}var he,pe=function(e){var t=e.gitHubLink,n=e.themeType,r=[["Personal Website","https://kr-matthews.github.io/",be],["Project Repository",t,"light"===(void 0===n?"light":n)?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEyQTk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE3OEEyQjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTI4OTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTI5OTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+m4QGuQAAAyRJREFUeNrEl21ojWEYx895TDPbMNlBK46IUiNmPvHBSUjaqc0H8pF5+aDUKPEBqU2NhRQpX5Rv5jWlDIWlMCv7MMSWsWwmb3tpXub4XXWdPHvc9/Gc41nu+nedc7/8r/99PffLdYdDPsvkwsgkTBwsA/PADJCnzX2gHTwBt8Hl7p537/3whn04XoDZDcpBlk+9P8AFcAghzRkJwPF4zGGw0Y9QS0mAM2AnQj77FqCzrtcwB1Hk81SYojHK4DyGuQ6mhIIrBWB9Xm7ug/6B/nZrBHBegrkFxoVGpnwBMSLR9EcEcC4qb8pP14BWcBcUgewMnF3T34VqhWMFkThLJAalwnENOAKiHpJq1FZgI2AT6HZtuxZwR9GidSHtI30jOrbawxlVX78/AbNfhHlomEUJJI89O2MqeE79T8/nk8nMBm/dK576hZgmA3cp/R4l9/UeSxiHLVIlNm4nFfT0bxyuIj7LHRTKai+zdJobwMKzcZSJb0ePV5PKN+BqAAKE47UlMnERELMM3EdYP/yrd+XYb2mOiYBiQ8OQnoRBlXrl9JZix7D1pHTazu4MoyBcnYamqAjIMTR8G4FT8LuhLsexXYYjICBiqhQBvYb6fLZIJCjPypVvaOoVAW2WcasCnL2Nq82xHJNSqlCeFcDshaPK0twkAhosjZL31QYw+1rlMpWGMArl23SBsZZO58F2tlJXmjOXS+s4WGvpMiBJT/I2PInZ6lIs9/hBsNS1hS6BG0DSqmYEDRlCXQrmy50P1oDRKTSegmNbUsA0zDMwRhPJXeCE3vWLPQMvan6X8AgIa1vcR4AkGZkDR4ejJ1UHpsaVI0g2LInpOsNFUud1rhxSV+fzC9Woz2EZkWQuja7/B+jUrgtIMpy9YCW4n4K41YfzRneW5E1KJTe4B2Zq1Q5EHEtj4U3AfEzR5SVY4l7QYQPJdN2as7RKBF0BPZqqH4VgMAMBL8Byxr7y8zCZiDlnOcEKIPmUpgB5Z2ww5RdOiiRiNajUmWda5IG6WbhsyY2fx6m8gLcoJDJFkH219M3We1+cnda93pfycZpIJEL/s/wSYADmOAwAQgdpBAAAAABJRU5ErkJggg==":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RERCMUIwOUY4NkNFMTFFM0FBNTJFRTMzNTJEMUJDNDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RERCMUIwOUU4NkNFMTFFM0FBNTJFRTMzNTJEMUJDNDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTJBOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTJCOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jUqS1wAAApVJREFUeNq0l89rE1EQx3e3gVJoSPzZeNEWPKgHoa0HBak0iHiy/4C3WvDmoZ56qJ7txVsPQu8qlqqHIhRKJZceesmhioQEfxTEtsoSpdJg1u/ABJ7Pmc1m8zLwgWTmzcw3L+/te+tHUeQltONgCkyCi2AEDHLsJ6iBMlgHL8FeoqokoA2j4CloRMmtwTmj7erHBXPgCWhG6a3JNXKdCiDl1cidVbXZkJoXQRi5t5BrxwoY71FzU8S4JuAIqFkJ2+BFSlEh525b/hr3+k/AklDkNsf6wTT4yv46KIMNpsy+iMdMc47HNWxbsgVcUn7FmLAzzoFAWDsBx+wVP6bUpp5ewI+DOeUx0Wd9D8F70BTGNjkWtqnhmT1JQAHcUgZd8Lo3rQb1LAT8eJVUfgGvHQigGp+V2Z0iAUUl8QH47kAA1XioxIo+bRN8OG8F/oBjwv+Z1nJgX5jpdzQDw0LCjsPmrcW7I/iHScCAEDj03FtD8A0EyuChHgg4KTlJQF3wZ7WELppnBX+dBFSVpJsOBWi1qiRgSwnOgoyD5hmuJdkWCVhTgnTvW3AgYIFrSbZGh0UW/Io5Vp+DQoK7o80pztWMemZbgxeNwCNwDbw1fIfgGZjhU6xPaJgBV8BdsMw5cbZoHsenwYFxkZzl83xTSKTiviCAfCsJLysH3POfC8m8NegyGAGfLP/VmGmfSChgXroR0RSWjEFv2J/nG84cuKFMf4sTCZqXuJd4KaXFVjEG3+tw4eXbNK/YC9oXXs3O8NY8y99L4BXY5cvLY/Bb2VZ58EOJVcB18DHJq9lRsKr8inyKGVjlmh29mtHs3AHfuhCwy1vXT/Nu2GKQt+UHsGdctyX6eQyNvc+5sfX9Dl7Pe2J/BRgAl2CpwmrsHR0AAAAASUVORK5CYII="]];return Object(d.jsx)("div",{className:"link-footer",children:r.map((function(e){var t=Object(i.a)(e,3),n=t[0],r=t[1],o=t[2];return Object(d.jsx)(je,{description:n,url:r,image:o},r)}))})},fe=n(15),me=n(16),Oe=Object(me.a)(he||(he=Object(fe.a)(["\n  body {\n      background: ",";\n      color: ",";\n      transition: all 0.75s ease-in;\n      transition-property: background, color\n    }\n  "])),(function(e){return e.theme.background}),(function(e){return e.theme.foreground}));function ge(e,t){var n=JSON.parse(localStorage.getItem(e)),o=Object(r.useState)(null===n?t:n),c=Object(i.a)(o,2),a=c[0],s=c[1];function l(t){s(t),localStorage.setItem(e,JSON.stringify(t))}return null===n&&l(a),[a,l]}function ve(e){var t=Object(r.useState)(null),n=Object(i.a)(t,2),o=n[0],c=n[1];return Object(r.useEffect)((function(){o&&e&&new Audio(o).play(),c(null)}),[o,e]),{setSoundToPlay:c}}var ye={light:{type:"light",background:"#F5F5F5",foreground:"#121212"},dark:{type:"dark",background:"#121212",foreground:"#F5F5F5"}},xe=Object(r.createContext)("all"),we=Object(r.createContext)(ye.light),ke=Object(r.createContext)();var Ae=function(){var e=ge("theme",ye.light),t=Object(i.a)(e,2),n=t[0],o=t[1],c=ge("gradients","all"),a=Object(i.a)(c,2),l=a[0],v=a[1],y=ge("sound",!0),x=Object(i.a)(y,2),w=x[0],k=x[1],A=ve(w).setSoundToPlay,C=ge("name","Nameless"),M=Object(i.a)(C,2),N=M[0],S=M[1],I=ge("colour",R()),T=Object(i.a)(I,2),F=T[0],J=T[1],B=Object(r.useState)(null),G=Object(i.a)(B,2),D=G[0],Z=G[1];function W(e,t){Z((function(n){if(n){var r=Object(s.a)({},n);return r[e]=t,r}}))}var P=Object(r.useState)(null),U=Object(i.a)(P,2),Y=U[0],H=U[1],L=Object(r.useCallback)((function(){H(null),Z(null),z(null),$(null),re(null)}),[]),Q=Object(r.useState)(null),V=Object(i.a)(Q,2),X=V[0],z=V[1],K=Object(r.useState)(null),q=Object(i.a)(K,2),_=q[0],$=q[1],ee=Object(r.useState)(null),te=Object(i.a)(ee,2),ne=te[0],re=te[1],oe=ge("uuid",function(){for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",t="",n=0;n<64;n++)t+=e[Math.floor(Math.random()*e.length)];return t}()),ce=Object(i.a)(oe,1)[0],ae=Object(r.useMemo)((function(){return new u.a({publishKey:"pub-c-444b80e2-3dd6-4998-ba4d-fdb8ea2f2d63",subscribeKey:"sub-c-d1ada3dc-38d4-11ec-8182-fea14ba1eb2b",uuid:ce})}),[ce]);return Object(d.jsx)(xe.Provider,{value:l,children:Object(d.jsx)(we.Provider,{value:n,children:Object(d.jsxs)(ke.Provider,{value:{setSoundToPlay:A},children:[Object(d.jsx)(Oe,{theme:n}),Object(d.jsx)("h1",{children:"Connect 4"}),Object(d.jsxs)(b,{children:[Object(d.jsxs)(j,{self:!0,children:[Object(d.jsx)(h,{editable:!0,name:N,setName:S}),Object(d.jsx)(p,{editable:!0,colour:F,setColour:J})]}),Object(d.jsxs)(f,{children:[Object(d.jsx)(m,{usingGradient:l,setUsingGradient:v}),Object(d.jsx)(g,{soundIsOn:w,toggleSound:function(){k(!w)}}),Object(d.jsx)(O,{themeType:n.type,toggleTheme:function(){o("light"===n.type?ye.dark:ye.light)}})]}),D?Object(d.jsxs)(j,{self:!1,children:[Object(d.jsx)(h,{editable:"local"===Y,name:D.name,setName:function(e){return W("name",e)}}),Object(d.jsx)(p,{editable:"local"===Y||"computer"===Y,colour:D.colour,setColour:function(e){return W("colour",e)}})]}):Object(d.jsx)(j,{self:!1})]}),"online"===Y?Object(d.jsx)(le,{roomCode:X,player:{name:N,colour:F,uuid:ce},isOwner:_,opponent:D,setOpponent:Z,restartMethod:ne,setRestartMethod:re,unmountRoom:L,network:ae}):"local"===Y?Object(d.jsx)(de,{sharingScreen:!0,player:{name:N,colour:F},opponent:D,unmount:L}):"computer"===Y?Object(d.jsx)(de,{sharingScreen:!1,player:{name:N,colour:F},opponent:D,unmount:L}):Object(d.jsx)(E,{setOpponent:Z,setPlayType:H,setRoomCode:z,setIsOwner:$,setRestartMethod:re,network:ae}),Object(d.jsx)(pe,{gitHubLink:"https://github.com/kr-matthews/connect-4",themeType:n.type})]})})})};n(37);a.a.render(Object(d.jsx)(o.a.StrictMode,{children:Object(d.jsx)(Ae,{})}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.0c7c7609.chunk.js.map