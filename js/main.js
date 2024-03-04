$(document).ready(function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var image = new Image();
    var frame = new Image();

    // Prevent default behavior (Prevent file from being opened)
    $('#drop-zone').on('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Optional: Add some visual cue to show it's ready to drop
    });

    $('#drop-zone').on('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (e.originalEvent.dataTransfer.files.length) {
            // Assuming only one file is needed; adjust if multiple files support is required
            var file = e.originalEvent.dataTransfer.files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
                image.onload = function() {
                    canvas.width = 1500; // Set canvas dimensions
                    canvas.height = 1500;
                    var hRatio = canvas.width / image.width;
                    var vRatio = canvas.height / image.height;
                    var ratio = Math.max(hRatio, vRatio); // Use the larger ratio to cover the canvas
                    var centerShift_x = (canvas.width - image.width * ratio) / 2;
                    var centerShift_y = (canvas.height - image.height * ratio) / 2;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(image, 0, 0, image.width, image.height,
                                    centerShift_x, centerShift_y, image.width * ratio, image.height * ratio);
                    drawFrame(); // Draw frame over the image
                };
                image.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    // Load and draw the uploaded image
    $('#upload').change(function(e) {
        var reader = new FileReader();
        reader.onload = function(event) {
            image.onload = function() {
                canvas.width = 1500; // Set canvas dimensions to 360x360
                canvas.height = 1500;
                var hRatio = canvas.width / image.width;
                var vRatio = canvas.height / image.height;
                var ratio = Math.max(hRatio, vRatio); // Use the larger ratio to cover the canvas
                var centerShift_x = (canvas.width - image.width * ratio) / 2;
                var centerShift_y = (canvas.height - image.height * ratio) / 2;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0, image.width, image.height,
                                    centerShift_x, centerShift_y, image.width * ratio, image.height * ratio);
                drawFrame(); // Draw frame over the image
            }
            image.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    });

    // Function to draw the frame
    function drawFrame() {
        var frameSrc = 'images/' + $('#frameSelect').val() +
        '.png'; // Assuming frames are named 'frame1.png', 'frame2.png', etc.
        frame.onload = function() {
            ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        }
        frame.src = frameSrc;
    }

    // Update frame when a new frame is selected
    $('#frameSelect').change(function() {
        drawFrame();
    });

    // Download the final image
    $('#download').click(function() {
        var downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = 'profile_with_frame.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
});