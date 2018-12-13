# logserver
template for json logging 

- Running

    - node server.js (Default port is 8888)

    - node server -p `<PORT>`

- Routes

    - POST (header: application/json) `/logs`: save a single json log file formatted as `witbee-YYYY-MM-DDTHH:mm:ss.sssZ.json`

    - GET `/logs`: lists all log files in an array
    
    - GET `/logs/FILENAME_LOG/`: download a single log file