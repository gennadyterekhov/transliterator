package controllers

import (
	"net/http"
)

func IndexPage(w http.ResponseWriter, req *http.Request) {
	render(w, "index", struct{}{})
}

func TransliteratePage(w http.ResponseWriter, req *http.Request) {

	render(w, "transliterate", struct{}{})
}

func AboutApiPage(w http.ResponseWriter, req *http.Request) {

	render(w, "aboutApi", struct{}{})
}
