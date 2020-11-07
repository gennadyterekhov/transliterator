'use strict';

const formElement = React.createElement;


class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        let optionsFrom = ['cyrillic'];
        let optionsTo = ['latin', 'arabic'];

        optionsFrom = this.enrichOptions(optionsFrom);
        optionsTo = this.enrichOptions(optionsTo);

        this.state = {
            optionsFrom,
            optionsTo,
            inputPlaceholder: 'Input',
            outputPlaceholder: 'Output',
            inputValue: '',
            outputValue: '',
        };
        this.handleOutputChange = this.handleOutputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    enrichOptions(arr) {
        let obj = [];
        for (let i = 0; i < arr.length; i += 1) {
            obj[i] = {lower: '', upper: ''};
            obj[i].lower = arr[i];
            obj[i].upper = this.capitalizeFirstLetter(arr[i]);
        }
        return obj;
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
        // this.setState({inputValue: event.target.value});
        this.setState({outputValue: event.target.value});
        // this.setState({outputValue: this.state.outputValue});
    }




    handleInputChange(event) {
        // console.log(event.target.id);
        // if (event.target.id == 'inputTextarea') {
        // }
        this.setState({inputValue: event.target.value});

        let selectTransliterateFrom = $("#selectTransliterateFrom option:selected")[0].value;
        // console.log(selectTransliterateFrom);
        // .find("option")[0].value
        let selectTransliterateTo = $("#selectTransliterateTo option:selected")[0].value;
        // console.log(selectTransliterateTo);

        let dataToSend = JSON.stringify({
            "from": selectTransliterateFrom,
            "to": selectTransliterateTo,
            "text": event.target.value 
        });
        // console.log(dataToSend);
        // var responseData = {};
        $.ajax(
            {
                // url: "http://localhost:8000/api/transliterate",
                url: "https://golang-react-transliterator.herokuapp.com/api/transliterate",
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
        // return responseData;


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
                    <select className="custom-select d-block w-75" name="from" id="selectTransliterateFrom" defaultValue="cyrillic" onChange={this.handleSelectChange}>
                        {/* <option value="cyrillic">Cyrillic</option> */}

                        {this.state.optionsFrom.map(
                            (value, index) => (
                                <option key={index} value={value.lower}>
                                    {value.upper}
                                </option>
                            )
                        )}

                    </select>
                    <br></br>

                    {/* <label for="inputTextarea">Input</label> */}
                    <textarea
                        className="form-control d-block w-75"
                        id="inputTextarea"
                        name="inputTextarea"
                        rows="20" cols="50"
                        onChange={this.handleInputChange}
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
                    <select className="custom-select d-block w-75" name="to" id="selectTransliterateTo" defaultValue="latin" onChange={this.handleSelectChange}>
                        {/* <option value="latin">Latin</option>
                        <option value="arabic">Arabic</option> */}

                        {this.state.optionsTo.map(
                            (value, index) => (
                                <option key={index} value={value.lower}>
                                    {value.upper}
                                </option>
                            )
                        )}

                    </select>
                    <br></br>
                    {/* <label for="outputTextarea">Output</label> */}
                    <textarea
                        className="form-control d-block w-75"
                        id="outputTextarea"
                        name="outputTextarea"
                        rows="20" cols="50"
                        onChange={this.handleOutputChange}
                        placeholder={this.state.outputPlaceholder}
                        value={this.state.outputValue}
                        // readOnly
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




