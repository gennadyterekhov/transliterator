package transliterate

import (
	"fmt"
	"os"
)

func Transliterate(from string, to string, text string) string {

	var original string = os.Getenv(from)
	var transliterated string = os.Getenv(to)

	if original == "" || transliterated == "" {
		fmt.Println("[error] transliteration not possible. variables not found in .env. unsupported alphabets.")
		return "[error] transliteration not possible. variables not found in .env. unsupported alphabets."
	}
	// количество символов в кириллице *2
	// если добавлять другие источники транслитерации то нужно это решать, убирать хардкод
	const numberOfChars int = 66
	// return fmt.Sprintf("%s %d", original, len(original))

	var originalRunes [numberOfChars]rune
	var transliteratedRunes [numberOfChars]rune
	var trans string = ""

	var correspondence map[rune]rune = make(map[rune]rune)

	var j uint8 = 0
	for _, runeValue := range original {
		originalRunes[j] = runeValue
		j += 1
	}
	j = 0
	for _, runeValue := range transliterated {
		transliteratedRunes[j] = runeValue
		j += 1
	}

	for i := 0; i < numberOfChars; i += 1 {
		correspondence[originalRunes[i]] = transliteratedRunes[i]
	}

	for _, runeValue := range text {
		if transliteratedChar, ok := correspondence[runeValue]; ok {
			//do something here
			trans += string(transliteratedChar)
		} else {
			trans += string(runeValue)
		}

	}

	return trans
}
