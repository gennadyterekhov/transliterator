'use strict';

const formElement = React.createElement;


class MainComponent extends React.Component {
    constructor(props) {
        super(props);

        let players = [
            {name: 'Игрок 1', score: 0},
            {name: 'Игрок 2', score: 0}
        ];


        this.state = {
            inputPlaceholder: 'Input',
            outputPlaceholder: 'Output',
            inputValue: '',
            outputValue: '',
        };
        this.handleOutputChange = this.handleOutputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    sendApiRequest(dataJson) {
        // let dataToSend = `{
        //     "from": "cyrillic",
        //     "to": "latin",
        //     "text": "привет"
        // }`;
        let dataToSend = JSON.stringify(dataJson);
        console.log(dataToSend);
        var responseData = {};
        let res = $.ajax(
            {
                url: "http://localhost:8000/api/transliterate",
                method: "POST",
                data: dataToSend
            }
            ).done( function(data){
                console.log(data);
                responseData = data;
            })
        
        console.log(responseData);
        return responseData;
    }


    getTransliteration(inputText) {
        let outputText = '';
        let dataToSend = {
            "from": "cyrillic",
            "to": "latin",
            "text": inputText
        };
        return this.sendApiRequest(dataToSend);
    }

    writeToOutput(str) {
        this.setState({outputValue: str});
    }

    handleOutputChange(event) {
        this.setState({inputValue: event.target.value});
    }

    handleChange(event) {
        this.setState({inputValue: event.target.value});



        let dataToSend = JSON.stringify({
            "from": "cyrillic",
            "to": "latin",
            "text": event.target.value 
        });
        console.log(dataToSend);
        // var responseData = {};
        $.ajax(
            {
                url: "http://localhost:8000/api/transliterate",
                method: "POST",
                data: dataToSend
            }
            ).done( function(dataStr){
                let data = JSON.parse(dataStr);
                let elem = $('#outputTextarea');
                elem[0].value = data.result;
                // this.writeToOutput(data['result']);
                // console.log(data);
                // console.log(data['result']);
                // console.log(data.result);
                // responseData = data;
                // this.setState({outputValue: data['result']});
            })
        
        // console.log(responseData);
        return responseData;


    }

    handleSubmit(event) {
        console.log('on submit works! current input:');
        // console.log(event);
        console.log(this.state.inputValue);
        let result = this.getTransliteration(this.state.inputValue);
        this.setState({outputValue: result.result});


        event.preventDefault();
    }



    render() {
        return (
            <div className="row">
                <div className="col">

                    <br></br>

                    {/* <form onSubmit={this.handleSubmit}> */}
                    <label htmlFor="from">From&nbsp;</label>
                    <select name="from" id="from" defaultValue="cyrillic">
                        <option value="cyrillic">Cyrillic</option>
                    </select>
                    <br></br>

                    {/* <label for="inputTextarea">Input</label> */}
                    <textarea
                        id="inputTextarea"
                        name="inputTextarea"
                        rows="20" cols="50"
                        onChange={this.handleChange}
                        placeholder={this.state.inputPlaceholder}
                        value={this.state.inputValue}
                    >
                    </textarea>
                    
                    <span> </span>
                    <br></br>
                    {/* <input type="submit" value="Submit" /> */}
                    {/* </form> */}
                </div>


                <div className="col">
                    <br></br>

                    <label htmlFor="to">To&nbsp;</label>
                    <select name="to" id="to" defaultValue="latin">
                        <option value="latin">Latin</option>
                    </select>
                    <br></br>
                    {/* <label for="outputTextarea">Output</label> */}
                    <textarea
                        id="outputTextarea"
                        name="outputTextarea"
                        rows="20" cols="50"
                        onChange={this.handleOutputChange}
                        placeholder={this.state.outputPlaceholder}
                        value={this.state.outputValue}
                        readOnly
                    >
                        {this.state.outputValue}
                    </textarea>
                    
                    <span> </span>

                </div>
            </div>
        );
    }
}



const domContainer = document.querySelector('#reactRoot');

ReactDOM.render(<MainComponent />, domContainer);




