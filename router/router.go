package router

import (
	"net/http"
	"transliterator/controllers"
)

func Router() {
	http.HandleFunc("/", controllers.IndexPage)
	http.HandleFunc("/transliterate", controllers.TransliteratePage)
	http.HandleFunc("/about/api", controllers.AboutApiPage)
	http.HandleFunc("/api/transliterate", controllers.ApiTransliterate)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("views"))))
}
