.PHONY: build
build:
	cd ./build; \
	cat ../main.js > application.js; \
	echo "\n" >> application.js; \
	cat ../client.js >> application.js; \
	echo "\n" >> application.js; \
	cat ../year.js >> application.js; \
	echo "\n" >> application.js; \
	cat ../makes.js >> application.js; \
	echo "\n" >> application.js; \
	cat ../equipment.js >> application.js; \
	echo "\n" >> application.js; \
	cat ../model.js >> application.js; \
	echo "\n" >> application.js; \
	cat ../actions.js >> application.js; \
	echo "\n" >> application.js; \
	cat ../storage.js >> application.js; \
	echo "\n" >> application.js; \
	cat ../collapse.js >> application.js; \
	echo "\n" >> application.js; \
	cat ../shadow.css > style.css; \
	cat ../style.css >> style.css; \
	cat header_widget.liquid > out.liquid; \
	echo "\n{% stylesheet %}\n" >> out.liquid; \
	cat style.css >> out.liquid; \
	echo "\n{% endstylesheet %}\n" >> out.liquid; \
	echo "\n{% javascript %}\n" >> out.liquid; \
	cat application.js >> out.liquid; \
	echo "\n{% endjavascript %}\n" >> out.liquid; \
	cat ../widget.html >> out.liquid