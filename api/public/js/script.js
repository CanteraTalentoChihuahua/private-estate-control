const video = document.getElementById('videoInput');
let halt = true;
let urlMatch = "";

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('models')
]).then(start)

function start() {
    document.body.append('Models Loaded\n')
    
    navigator.getUserMedia(
        { video:{} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
    
    console.log('Starting Face ID...')
    recognizeFaces()
}

async function recognizeFaces() {

    const labeledDescriptors = await loadLabeledImages()
    console.log(labeledDescriptors)
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.55)

    video.addEventListener('play', async () => {
        console.log('Playing')
        const canvas = faceapi.createCanvasFromMedia(video)
        document.body.append(canvas)

        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
        
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
        
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        
            console.log("CURRENT HALT 1: " + halt);
        
            if (halt) {
        
            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            results.every( (result, i) => {
                const box = resizedDetections[i].detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvas)
                return true;
            })
            detections.every( fd => {
                const bestMatch = faceMatcher.findBestMatch(fd.descriptor)
                const newMatch = bestMatch.toString().replace(/[0-9\(\).]/g, '')
                urlMatch = newMatch.replaceAll(" ", "_")
                if (bestMatch.toString().includes("unknown")) {
                    console.log("ACCESS DENIED TO: " + bestMatch.toString())
                } else {
                    console.log("OLD DATA: " + bestMatch.toString())
                    if (newMatch != 'unknown') {
                      console.log("ACCES GRANTED TO: " + newMatch);
                      halt = false;
                      console.log("CURRENT HALT 2: " + halt);
                      return false;
                    }
                }
                return true;
            })
            } else { 
                halt = true;
                console.log("FACE ID DONE, REDIRECTING...")
                fetchAsync(`http://localhost:2000/face-id/fetch/${urlMatch}`);
            } 
        }, 2000)
        
        clearInterval()
        
    })
}

async function loadLabeledImages() {
    //const labels = ['Black Widow', 'Captain America', 'Hawkeye' , 'Jim Rhodes', 'Tony Stark', 'Thor', 'Captain Marvel']
    const labels = ['Arnoldo Valdez', 'Arturo Balsimelli', 'Brayan Paul Salas', 'Javier Medrano' , 'Karol Gutierrez'] // Webcam
    //const labels = await fetchPeople('http://localhost:2000/face-id/fetch/people')
    console.log(labels);
        return Promise.all(
            labels.map(async (label)=>{
                const descriptions = []
                for(let i=1; i<=2; i++) {
                    const img = await faceapi.fetchImage(`labeled_images/${label}/${i}.jpg`)
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                    //console.log("CHECK WE " + label + i + JSON.stringify(detections))
                    descriptions.push(detections.descriptor)
                }
                document.body.append(label+' Faces Loaded | ')
                return new faceapi.LabeledFaceDescriptors(label, descriptions)
            })
        )
}

async function fetchAsync(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
}

const fetchPeople = async (urlPeople) => {
    let responsePeople = await fetch(urlPeople);
    let objPeople = await responsePeople.json();
    return objPeople;
}