# Documentación Proyecto DWEC - Pokecarril

[Página web (poke.perrocarril.com)](poke.perrocarril.com)

## Temática cara al usuario
De cara al usuario, es una página web donde consultar los distintos pokémon, sus nombres, tipos, estadísticas, su número de pokédex y la generación a la que pertenecen, además de un gráfico para ver de manera cómoda la distribuición de sus estadísticas. 

## Funcionamiento interno
Toda la información de los pokémon la saca de la [pokeapi](https://pokeapi.co/).

Al hacer click en una generación, lanza una petición que devuelve la lista de pokémon de ésta, luego, por cada pokémon retornado (del cual tenemos solamente el nombre y poco más), se hace otra petición para conseguir sus datos completos.

Como este proceso a veces es un poco lento debido a que la lista es larga, se guardan los datos más importantes de cada pokémon en localStorage, así sólo tarda mucho rato la primera vez que se descargan. No tiene caducidad, pero cada juego de pokémon solo suele añadir nuevos pokémon en una nueva generación (al final de la lista) así que no debería haber problema con respecto a actualizar los datos guardados en local, ya que no debería ser necesario. También guarda datos del último pokemon y generación seleccionados en cookies, para que no cambie al navegar entre apartados ni al recargar la página.

En la parte de login se puede crear una cuenta a través de Supabase y hacer login y logout con ella, aunque el perfil no contiene datos reales porque no he podido hacerlo funcionar por falta de tiempo. Tampoco sirve de nada, en un principio la idea era poder guardar pokémon como favoritos y organizarlos en equipos.

Pensé en utilizar la librería de Supabase para hacer lo que no sabía hacer mediante peticiones, pero lo he pensado tarde así que eso será para el próximo proyecto.

El código contiene funciones bastante largas que se podrían dividir en varias, además de funciones entramadas entre ellas porque se llaman unas a otras dentro del código en lugar de hacerlo a través de los parámetros. Me habría gustado refactorizarlo y darle un enfoque más funcional, pero el tiempo no ha dado para más.

## Criterios de avaluación

### Requerimientos del documento de texto

[Documento de texto](https://docs.google.com/document/d/1mnpIUnFsaFZfTMRmMwqp7RrBb9smubyRHoaF_awUuwo)

 - La página web es una single page application.
 - Tiene formularios en el login y el registro
 - Tiene un frontend donde ver los datos de los pokémon
 - No tiene un backend porque no he podido hacer uso de los datos de usuario a través de Supabase
 - No simula eventos. No tengo claro a qué se refiere este punto.
 - Los únicos datos que obtiene de Supabase es si las credenciales de login son correctas o no
 - Utiliza tanto cookies como localStorage, tanto para guardar credenciales como datos de pokémon.
 - Muestra datos en un gráfico (Stats del pokémon)
 
 ### Requerimientos de la hoja de cálculo
 [Hoja de cálculo](https://docs.google.com/spreadsheets/d/1HxcvxqYWlBk0ug2K5YJdPWM3H4Bww76_3lXhXDF3SF8/)
 
 - Hay objetos literales marcados con el comentario `//OBJETO LITERAL`
 - Todas las variables utilizadas son let y const
 - No estoy seguro de qué es un iterable. Hay forEach y map, marcados con `// ITERABLE`
 - Hay funciones, aunque no siempre con sintaxis adecuada.
 - Hay una función autoinvocada en el index.js para hacer el programa entero privado
 - Hay funciones flecha. Algunas están marcadas con `// FLECHA`
 - Hay template literals marcados con `// TEMPLATE LITERAL`
 - Hay algún Math y JSON marcados con `// OBJETO PREDEFINIDO`
 - Hay queryselectors marcados con `// QUERY SELECTOR`
 - Los nodos se modifican tanto al cambiar de apartado (se borra la página y se recrea) como al cambiar de pokémon o de generación
 - Los formularios de login y registro se validan
 - Hay destructuring en varias partes del código marcadas con `// DESTRUCTURING`
 - Hay closures aunque no sé identificarlas bien.
 - No sé qué es el registro de eventos W3C
 - Hay fetch marcados con `// FETCH`
 - No hay programación funcional (No sabía técnicas de programación funcional durante la mayor parte del proceso de realización del proyecto)
 - No hay formData
 - Se utiliza Supabase para registrar y hacer login de los usuarios
 - Hay async/await en el proyecto (no lo marco porque se puede buscar `async` o `await`)
 - No sé a qué se refiere con el uso del JSON. Después de cada fetch utilizo la función `.json()`.
 - Se utilizan cookies para guardar el último pokémon seleccionado además de su generación. Se utiliza localStorage para guardar los datos de todos los pokémon además de la sesión del usuario.
 - Todo el proyecto está organizado por módulos.
 - El proyecto se asemeja en estructura a un MVC y tiene router (`src/utils/routes.js`). Incluye un 404 para rutas inexistentes.
 - No hay tests
 - Se utiliza Webpack
## Notas finales
Como ya digo en varios puntos, me ha faltado tiempo para terminar el proyecto como me habría gustado, de la lista de cosas para hacer me han quedado fuera un 40% de los puntos aproximadamente, la mayoría relacionados con funcionalidades de la página.

Había muy poca documentación disponible sobre cómo hacer las peticiones a Supabase "a mano", ya que parece que todo gira en torno a su paquete NPM. Por ejemplo, para hacer querys a la base de datos, si revisamos la documentación que ponen para Bash, no incluye ningún body en la petición, sin embargo, si no incluyes uno, devuelve un error un tanto oscuro que no da mucha opción a entender por qué no está funcionando.

He decidido subirlo a mi servidor en lugar de al TIC Simarro porque no sé donde tengo las credenciales del TIC ni cómo funciona realmente, hicimos una práctica pero fue 100% guiada así que nisiquiera recuerdo qué hicimos.

En mi servidor funciona a través de un contenedor Nginx en Docker, al cual se accede por un remote proxy (también Nginx) en la máquina host. Como ya tenía las base preparadas de proyectos anteriores, para desplegar una nueva web solo he tenido que copiar la configuración, cambiar el puerto y añadir un nuevo A Record en Cloudflare.