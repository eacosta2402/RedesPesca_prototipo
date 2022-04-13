function draw() {
    var mydata = JSON.parse(data);
    console.log(mydata[0].plantilla);

    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal 
        
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
        
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    var contador=12;
    let marg = 0;
    let pend = 0;
    var i=0;
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      for (i=0; i<mydata.length; i++) {
        let obj = mydata[i];
        if(obj.tipo === "C" ){
            this.dibujarCuadrilatero(obj,ctx, canvas);
            this.dibujarLineas(obj,ctx, 10);
        }
        else if (obj.tipo === "T" ){
            this.dibujarTriangulo(obj,ctx);
        }
      }
    }

    

    

    function aleatorio(minimo,maximo){
      return Math.floor(Math.random() * ((maximo+1)-minimo)+minimo);
    }

//     function draw() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         for (var i = 0; i < rects.length; i++) {
//             var rect = rects[i];
//             if (rect.isFilled) {
//                 ctx.fillStyle = rect.fillcolor;
//                 ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
//             }
//             ctx.strokeStyle = "black";
//             ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
//         }
//     }
//     function handleMouseDown(e) {
//       e.preventDefault();
//       mouseX = parseInt(e.clientX - offsetX);
//       mouseY = parseInt(e.clientY - offsetY);
//       for (var i = 0; i < rects.length; i++) {
//           var rect = rects[i];
//           if (hit(rect, mouseX, mouseY)) {
//               rect.isFilled = !rect.isFilled;
//           }
//       }
//       //draw();
// }
      let that = this;
      let canvasElem = document.getElementById("canvas");
      canvasElem.addEventListener("mousedown", function(e)
      {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        var canvas2 = document.getElementById("canvas2");
        this.array=[];
        if (canvas2.getContext) {
            let ctx_detalle = canvas2.getContext("2d");
            ctx_detalle.clearRect(0, 0, canvas2.width, canvas2.height);
            let mydataVal = JSON.parse(data);
            let coordXIni = 12;
            let coordYIni = 10;
            for (let index = 0; index < mydataVal.length; index++) {
                const element = mydataVal[index];
                if(e.offsetX >= element.x1 && e.offsetX <= element.x2){
                    let obj = {};
                    if(element.tipo === "C" ){
                        
                        let restaX = Number(element.x2) - Number(element.x1);
                        let restaYD = Number(element.y2) - Number(element.y1);
                        let restaYI = Number(element.y3) - Number(element.y1);
                        let coordXFin = coordXIni + restaX;
                        let coordYFinD = coordYIni + restaYD;
                        let coordYFinI = coordYIni + restaYI;

                        obj = {
                            x1: coordXIni,
                            x2: coordXFin,
                            y1: coordYIni,
                            y2: coordYFinD,
                            y3: coordYFinI
                        };

                        that.dibujarCuadrilatero(obj,ctx_detalle, canvas2);
                        //this.dibujarLineas(obj,ctx, 10);
                        if(coordYFinD === coordYFinI){
                            coordYIni = coordYFinD;
                        }
                    }
                    else if (element.tipo === "T" ){
                        let restaX = Number(element.x2) - Number(element.x1);
                        let restaYD = Number(element.y2) - Number(element.y1);
                        let coordXFin = coordXIni + restaX;
                        let coordYFinD = coordYIni + restaYD;

                        obj = {
                            x1: coordXIni,
                            x2: coordXFin,
                            y1: coordYIni,
                            y2: coordYFinD,
                            y3: ""
                        };
                        that.dibujarTriangulo(obj,ctx_detalle);

                    }
                    

                    //break;
                }

                // if(book){
                //   if(e.offsetY >= 110 && e.offsetY <= 270){
                //     book = true;
                //   }else{
                //     book = false;
                //   }
                // }
                

                // if(book){
                //   console.log("esta dentro del paño");
                //   //console.log(e);
                // }else{
                //   console.log("esta fuera del paño");
                //   //console.log(e);
                // }
                
            }

        }


        
        // new Path2D();
        // new Path2D(path);
        // new Path2D(d);
            // let book = false;
          // if(e.offsetX >= 82 && e.offsetX <= 152){
          //   book = true;
          // }

          // if(book){
          //   if(e.offsetY >= 110 && e.offsetY <= 270){
          //     book = true;
          //   }else{
          //     book = false;
          //   }
          // }
          

          // if(book){
          //   console.log("esta dentro del paño");
          //   //console.log(e);
          // }else{
          //   console.log("esta fuera del paño");
          //   //console.log(e);
          // }
          console.log(e);
          //alert("Hola")
          
      });
  }

  function dibujarTriangulo(obj ,canvas){
    canvas.beginPath();
    canvas.moveTo(obj.x1,obj.y1);
    canvas.lineTo(obj.x2,obj.y1);
    canvas.lineTo(obj.x2,obj.y2);
    canvas.closePath();
    canvas.stroke();
}

function dibujarCuadrilatero(obj, canvas,cv){
    canvas.beginPath();
    canvas.moveTo(obj.x2,obj.y2);
    canvas.lineTo(obj.x2,obj.y1);
    canvas.lineTo(obj.x1,obj.y1);
    canvas.lineTo(obj.x1,obj.y3);
    canvas.closePath();
    //canvas.fill();
    canvas.stroke();

    //---------------Poner el texto a la figura
    let restaX = Number(obj.x2) - Number(obj.x1);
    let cordCenterX = Number(obj.x1) + Number((restaX/2).toFixed(2));

    let restaY = Number(obj.y2) - Number(obj.y1);
    let cordCenterY = Number(obj.y1) + Number((restaY/2).toFixed(2));

	canvas.textAlign="center";
	canvas.font="8pt Arial";
	canvas.fillStyle = "black";
	canvas.fillText("55 TR-BD",cordCenterX,cordCenterY);

    canvas.textAlign="center";
	canvas.font="8pt Arial";
	canvas.fillStyle = "black";
	canvas.fillText("5/5 '' 5P",cordCenterX,cordCenterY + 10);
}

function dibujarLineas(obj,canvas,cantLineas){
    let indice = 0;
    let restaCoordDer = obj.y3 - obj.y1; 
    let restaCoordIzq = obj.y2 - obj.y1;
    let espacioLineasDer =  restaCoordDer/(cantLineas + 1);
    let espacioLineasIzq =  restaCoordIzq/(cantLineas + 1);
    let newCoordYDer = Number(obj.y1);
    let adicionDer = Number(espacioLineasDer.toFixed(2));
    while(indice<cantLineas){
        //------------- lINEAS DERECHA
        newCoordYDer = newCoordYDer + adicionDer;
        canvas.beginPath();
        canvas.moveTo(obj.x1,newCoordYDer);
        canvas.lineTo(Number(obj.x1) + 8,newCoordYDer);
        canvas.closePath();
        canvas.stroke();

        // ----------------- LINEAS IZQUIERDA 
        canvas.beginPath();
        canvas.moveTo(obj.x2,newCoordYDer);
        canvas.lineTo(Number(obj.x2) - 8,newCoordYDer);
        canvas.closePath();
        canvas.stroke();

        indice++;

    }
}