package helper

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strings"
)

type RequestJson struct {
	From string `json:"from"`
	To   string `json:"to"`
	Text string `json:"text"`
}

type ResponseJson struct {
	Ok     bool   `json:"ok"`
	From   string `json:"from"`
	To     string `json:"to"`
	Result string `json:"result"`
}

func Check(e error) {
	if e != nil {
		fmt.Println("==[AN ERROR OCURRED]==")
		panic(e)
	}
}

// copied from https://stackoverflow.com/questions/51183462/how-to-copy-os-stdout-output-to-string-variable/51183660
func Capture() func() (string, error) {
	r, w, err := os.Pipe()
	Check(err)

	done := make(chan error, 1)

	save := os.Stdout
	os.Stdout = w

	var buf strings.Builder

	go func() {
		_, err := io.Copy(&buf, r)
		r.Close()
		done <- err
	}()

	return func() (string, error) {
		os.Stdout = save
		w.Close()
		err := <-done
		return buf.String(), err
	}
}

func GetRequestJson(jsonString []byte) RequestJson {
	var requestStruct RequestJson = RequestJson{}
	if err := json.Unmarshal(jsonString, &requestStruct); err != nil {
		panic(err)
	}
	return requestStruct
}

func GenerateResponseBody(from string, to string, result string) string {
	var responseStruct ResponseJson = ResponseJson{
		Ok:     true,
		From:   from,
		To:     to,
		Result: result,
	}
	resultBytes, err := json.Marshal(responseStruct)
	Check(err)
	var resultString string = string(resultBytes)
	return resultString
}
