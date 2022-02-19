window.onload = function() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let mazeImg = document.getElementById("maze");
    let faceImg = document.getElementById("face");
    window.onkeydown = processKey;
    let x = 0;
    let y = 0;
    let dx = 0;
    let dy = 0; 
    let timer;
    // отрисовать фон лабиринта
    drawMaze(268, 5);
  
    // отрисовка фона
    function drawMaze(startingX, startingY) {
      canvas.width = mazeImg.width;
      canvas.height = mazeImg.height;
  
      // Рисуем лабиринт
      context.drawImage(mazeImg, 0,0);
  
      // Рисуем значок
      x = startingX;
      y = startingY;
      context.drawImage(faceImg, x, y);
      context.stroke();
  
      // Рисуем следующий кадр
      window.requestAnimationFrame(drawFrame);
    }
  
    // Обработка нажатия кнопок
    function processKey(e) {
      e.preventDefault();
  
      // Если значок находится в движении, 
      // останавливаем его
      dx = 0;
      dy = 0;
  
      // Если нажата стрелка вверх, 
      // начинаем двигаться вверх
      if (e.keyCode == 38) {
        dy = -1;
      }
  
      // Если нажата стрелка вниз, 
      // начинаем двигаться вниз
      if (e.keyCode == 40) {
        dy = 1;
      }
  
      // Если нажата стрелка влево, 
      // начинаем двигаться влево
      if (e.keyCode == 37) {
        dx = -1;
      }
  
      // Если нажата стрелка вправо, 
      // начинаем двигаться вправо
      if (e.keyCode == 39) {
        dx = 1;
      }
    }
  
    // Отрисовка кадра
    function drawFrame() {
      // Обновляем кадр только если значок движется
      if (dx != 0 || dy != 0) {
        //Закрашиваем перемещение значка желтым цветом
        context.beginPath();
        context.fillStyle = "rgb(254,244,207)";
        context.rect(x, y, 15, 15);
        context.fill();
  
        // Обновляем координаты значка, создавая перемещение
        x += dx;
        y += dy;
  
        // Проверка столкновения со стенками лабиринта
        if (checkForCollision()) {
          x -= dx;
          y -= dy;
          dx = 0;
          dy = 0;
        }
        context.drawImage(faceImg, x, y);
        if (y > (canvas.height - 17)) {
          alert("Ты победил!");
          return; 
        }
      }
  
      window.requestAnimationFrame(drawFrame);
    }

    function checkForCollision() {
      let imgData = context.getImageData(x-1, y-1, 15+2, 15+2);
      let pixels = imgData.data;
      for (let i = 0; n = pixels.length, i < n; i += 4) {
        let red = pixels[i];
        let green = pixels[i+1];
        let blue = pixels[i+2];
        let alpha = pixels[i+3];
        if (red == 0 && green == 0 && blue == 0) {
          return true;
        }
        if (red == 169 && green == 169 && blue == 169) {
          return true;
        }
      }
      return false;
    }
  }