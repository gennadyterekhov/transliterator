# transliterator

API for transliteration. Right now only works for russian cyrillic -> latin
  

## Making requests

right now there's only one endpoint available  
POST /api/transliterate  
Content-Type: application/json  

request example:  

    {
        "from": "cyrillic",
        "to": "latin",
        "text": "привет"
    }

response example:

    {
        "ok": true,
        "from": "cyrillic",
        "to": "latin",
        "text": "privet"
    }

## Run locally

.env file must be present and contain your letter correspondences:

    PORT=8000  
    cyrillic=АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя  
    latin=ABVGDEËẐZIJKLMNOPRSTUFĤĊĆŜŚJYJÊÜÄabvgdeëẑzijklmnoprstufĥċćŝśjyjêüä  

then run:

    go run server.go

this will run a server on port specified inside .env  
there's only one route - /api/transliterate  
how to make requests is discussed above  