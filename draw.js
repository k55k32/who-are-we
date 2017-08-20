function initInput() {
    var parent = document.querySelector('#input-container')
    var dataArr = {}
    for (var i = 0; i < 6; i++) {
        // var input = document.createElement('textarea')
        var input = document.createElement('input')
        var text = '请输入第' + (i + 1) + '行字'
        input.setAttribute('placeholder', text)
        dataArr[i] = text
        input.onchange = function(index, target) {
            return function() {
                dataArr[index] = target.value
                renderCanvas(dataArr)
            }
        }(i, input)
        input.onkeyup = function(index, target) {
            return function() {
                dataArr[index] = target.value
                renderCanvas(dataArr)
            }
        }(i, input)
        parent.appendChild(input)
    }
    renderCanvas(dataArr)
}

function renderCanvas(data) {
    var CENTER_ONE = 155
    var CENTER_TOW = 460
    var LINE_HEIGHT = 230
    var TOP_ONE = 40
    var TOP_TWO = TOP_ONE + LINE_HEIGHT
    var TOP_THREE = TOP_TWO + LINE_HEIGHT
    var DATA_POSITION = [
        [TOP_ONE, CENTER_ONE],
        [TOP_ONE, CENTER_TOW],
        [TOP_TWO, CENTER_ONE],
        [TOP_TWO, CENTER_TOW],
        [TOP_THREE, CENTER_ONE],
        [TOP_THREE, CENTER_TOW],
    ]
    var canvas = document.createElement('canvas')
    var image = new Image()
    var preview = document.querySelector('#previewImage')
    image.onload = function() {
        canvas.width = image.width
        canvas.height = image.height
        var ctx = canvas.getContext('2d')
        var fontSize = 20
        ctx.font = 'bold ' + fontSize + 'px 微软雅黑'
        ctx.fillStyle = '#000000'
        ctx.textAlign = 'center'
        ctx.drawImage(image, 0, 0)
        Object.keys(data).forEach(function(k) {
            let text = data[k]
            let position = DATA_POSITION[k]
            text.split('\n').forEach(function(line, index) {
                ctx.fillText(line, position[1], position[0] + index * fontSize)
            })
        })
        preview.src = canvas.toDataURL()
    }
    image.src = './who-are-we.jpg'
}


initInput()
