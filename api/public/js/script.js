import sql from "../../node_modules/@types/mssql/index";

const video = document.getElementById('videoInput');
const userByName = `SELECT IdUser, FirstName + ' ' + LastName + ' ' AS 'FullName' FROM T_Users WHERE FirstName + ' ' + LastName + ' ' = @faceName`;
const accessRegister = `INSERT INTO T_Accesses (IdUser, Date) VALUES (@idUser, @date)`;
let halt = true;

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('models') //heavier/accurate version of tiny face detector
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
                if (bestMatch.toString().includes("unknown")) {
                    console.log("ACCESS DENIED TO: " + bestMatch.toString())
                } else {
                    console.log("OLD DATA: " + bestMatch.toString())
                    const newMatch = bestMatch.toString().replace(/[0-9\(\).]/g, '')
                    if (newMatch == 'Brayan Paul Salas ') {
                      console.log("ACCES GRANTED TO: " + newMatch);
                      halt = false;
                      console.log("CURRENT HALT 2: " + halt);
                      return false;
                    }
                }
                return true;
            })
            } else { 
                console.log("FACE ID DONE, REDIRECTING...")
                loadFromDatabase(newMatch);
            } 
        }, 200)
        
    })
}

function loadLabeledImages() {
    //const labels = ['Black Widow', 'Captain America', 'Hawkeye' , 'Jim Rhodes', 'Tony Stark', 'Thor', 'Captain Marvel']
    const labels = ['Arnoldo Valdez', 'Arturo Balsimelli', 'Brayan Paul Salas', 'Javier Medrano' , 'Karol Gutierrez'] // Webcam
    return Promise.all(
        labels.map(async (label)=>{
            const descriptions = []
            for(let i=1; i<=2; i++) {
                const img = await faceapi.fetchImage(`labeled_images/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                console.log("CHECK WE " + label + i + JSON.stringify(detections))
                descriptions.push(detections.descriptor)
            }
            document.body.append(label+' Faces Loaded | ')
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}

async function getConnection() {
    try {
        const pool = await sql.connect(
            {
                user: process.env.USER,
                password: process.env.PASSWORD,
                server: process.env.SERVER,
                port: Number(process.env.DBPORT),
                database: process.env.DATABASE,
                options: {
                    encrypt: false,
                    trustServerCertificate: false
                }
            }
        )
        return pool;
    } catch (error) {
        console.log(error);
    }

}

async function loadFromDatabase(faceName){
    let setDate = '2022-07-13'
    try {
        const pool = await getConnection();
        const match = await pool?.request()
            .input('faceName', faceName)
            .query(userByName)

        if (faceName == match?.recordset[0].FullName) {
            console.log("Access log registered")
            return await pool?.request()
                .input('idUser', match?.recordset[0].IdUser)
                .input('date', setDate)
                .query(accessRegister)
        } else {
            return console.log("Not a user or face with that name registered")
        } 

    } catch (error) {
        return console.log(error)
    }
}