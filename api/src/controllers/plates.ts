import { PythonShell } from 'python-shell';

export const test = async (req: any, res: any) => {

    try {
        let pyshell = new PythonShell('plates.py');

        // sends a message to the Python script via stdin
        pyshell.send('carro3.jpeg');

        pyshell.on('message', function (message) {
            // received a message sent from the Python script (a simple "print" statement)
            console.log(message);
        });

        // end the input stream and allow the process to exit
        pyshell.end(function (err, code, signal) {
            if (err) throw err;
            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished');
        });

    } catch (error) {
        res.status(500);
        res.send(error);
    }

}