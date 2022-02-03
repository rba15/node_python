const express=require('express');
const {spawn}=require('child_process');
var app=express();
var bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router(); 

router.get('/', function(req, res) {
    res.json({ message: 'Python Script Runner' });
});

function runScript(res,script_name,args){

    var output='';
    var error='';
    const python = spawn('python', ['scripts/'+script_name + '.py', args]);
    python.stdout.on('data', function (data) {
        output = data.toString();
    });

    python.stderr.on('data', function (data) {
        error = data.toString();
    });

    python.on('close', () => {
        output=output.replace('\n','').replace('\r','');
        error=error.replace('\n','').replace('\r','');
        res.json({'output':output,'error':error});
    });
}

router.route('/run/:script_id').get(function(req, res) {
    
    script_name=req.params.script_id;
    args=JSON.stringify(req.query);
    runScript(res,script_name,args);

}).post(function(req, res) {
    
    script_name=req.params.script_id;
    args=JSON.stringify(req.body);
    runScript(res,script_name,args);
});;

app.use('/', router);

app.listen(port);
console.log('node js listening on port ' + port);