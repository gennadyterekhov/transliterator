package controllers

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"transliterator/helper"
	"transliterator/transliterate"
)

func ApiTransliterate(w http.ResponseWriter, req *http.Request) {
	body, err := ioutil.ReadAll(req.Body)
	helper.Check(err)

	var requestStruct helper.RequestJson = helper.GetRequestJson(body)

	var result string = transliterate.Transliterate(requestStruct.From, requestStruct.To, requestStruct.Text)

	var responseBody string = helper.GenerateResponseBody(requestStruct.From, requestStruct.To, result)

	fmt.Fprintf(w, responseBody)
}
