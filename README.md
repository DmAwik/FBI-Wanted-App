## Navigation
* [Requirements](#fbi-wanted)
* [Instalation/Launching/Testing](#instalationlaunchingtesting)
* [Conventional Commit Messages](#conventional-commit-messages)
* [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow#:~:text=What%20is%20Gitflow%3F,lived%20branches%20and%20larger%20commits.)


# FBI Wanted

## Часть 1
**Создать каркас будущего приложения.**

**На данном этапе будет включать в себя:**

* Header -- “шапка” страницы. Всегда остаётся видимой через всё приложение. В ней отображается некоторая пользовательская информация и кнопка logIn/LogOut.
* Авторизация -- диалоговое окно с возможностью ввода логина/пароля. Будут три роли: admin, user и guest. Т.к. полноценного сервиса для аутентификации не будет, то предлагаю использовать обычный json-файл, сханящий всех заранее подготовленных пользователей, и закинуть его в какую-нибудь assets папку проекта. После авторизации заносить инфу о пользователе в localstorage. Таким образом, предполагается создание сервиса для авторизации, который будет эмулировать аутентификацию (будет чекать инфу из json-файла) и заносить данные о пользователе в localstorage. И, соответственно, удалять инфу о пользователе при logOut. 
* Основная часть под header-ом. Состоит из двух частей: первая -- слева sidebar с меню-ссылками на остальные страницы приложения, вторая -- контент-часть приложения. В контенте пока будут 3 страницы: стартовая, FBI-wanted контент, настройки.
Стартовая. Наполнение большого значения не имеет, и может содержать любую инфу. Главные требования: должна содержать кнопку LogIn (вызывает диалоговое окно с возможностью ввода логина/пароля), а также скрытый sidebar с меню, если пользователь еще не авторизован. Любые попытки перейти по различным адресам внутри приложения должны редиректить неавторизированного пользователя на эту страницу.
“FBI-wanted контент” и “Настройки” страницы пока что оставить пустыми.
Модули (компоненты в модули), LazyLoading

**Дополнительные требования и рекомендации:**

* Единый стиль во всём: в нейминге файлов, переменных, классов и т.п., в структурах подпапок и т.д..
* Использование mat-design библиотеку, чтобы облегчить работу.
* Стилизация приложения -- вольная.Приложение может выглядеть минималистично, без лишних фишек, но, тем не менее, “опрятно” и аккуратно.
Первым шагом рекомендую продумать структуру проекта, и где какой компонент/сервис/еще что-нибудь будет находится, в какой папке.
Создание пуш-реквестов -- на твоё усмотрение, но, тем не менее, должны быть продуманными. Каждый пуш-реквест -- это некоторое рабочее состояние приложения, законченная функциональная его часть. Не следует его делать на середине разработки какой-то функциональной части, но так же и не следует накапливать “овер 1000 строк кода”.
Используемый префикс: fw (по умолчанию вроде app. Изменить это в настройках проекта)

**Именование файлов:** в нижнем регистре с дефисом.

Например:
```
god-please-help-me.component.ts
```
  
Постфикс в файлах должен отображать информацию о его предназначении. Например:
```
Component:		***.component.ts
Service:		***.service.ts
Consts:		***.const.ts
Interface:		***.interface.ts и т.д…
```

И еще кое-что. Задача, как мог заметить, описана довольно кратко без однозначных точных требований о том, как должно выглядеть, какие цветовые схемы использовать, какова должна быть архитектура, какой текст должна страница содержать и т.п. Это значит, что большинство решений будет за тобой, но пожалуйста без фанатизма. Не стоит отдавать по 3-4 часа на то, чтобы, например, сместить кнопочку на 3 пикселя влево. В главную очередь перед нами ставится задача постичь все необходимые основы фреймворка и поработать на практике, дабы закрепить знания. 
Вот в общем-то и всё. Остальная часть задания уже по ходу продвижения работы с приложением.
**Доп. требования:**
- Логин/логаут
- Автоматическая отписка (npm: https://www.npmjs.com/package/@ngneat/until-destroy )
- OnPush. Добавить во все компоненты. А также в angular.json добавить соответствующую пропертю (создавать компоненты с OnPush стратегией по дефолту)
- SCSS


##  ЧАСТЬ 2
FBI-wanted контент.
Исходные данные будут браться из Open Data ресурса (https://www.fbi.gov/wanted/api).

Страница будет представлять из себя список с краткой информацией (несколько полей из респонса). Предусмотреть пагинацию.
Должна присутствовать кнопка (или иной другой элемент) “Show details”(“Hide details”), по нажатию по которой часть контента на странице (правая часть) отображает более подробную информацию о текущем элементе списка.

Текущий пользователь выбирается нажатием элемента из списка. Текущий выбранный по умолчанию -- первый в списке.

Детальная информация должна содержать уже больше данных о текущей персоне.. Выбор отображаемых данных -- на своё усмотрение, но среди них обязательно должны быть со всеми возможными типами: картинка, текст, дата, числа и т.п.

##  ЧАСТЬ 3
Каждая часть -- отдельный ПР

- Добавить кастомный пайп дефолтных значений для страницы с деталями о записи. Т.е. Если приходит пустое значение, то выводить некоторое дефолтное значением (например, приходит запись с пустым Именем. Можно вместо пустой строки отображать “Имя не определено”)

- Накинуть фильтров на несколько полей.

- Запрос на редактирование записи. 
На беке редактирования нет. Поэтому будет эмулирован запрос на редактирование. Это значит, что исходная запись редактируется через отдельную форму, а затем “якобы” посылается в очередь апрува на подтверждение редактирования. Все “запросы на редактирование” будут хранится в собственной БД. Использовать на выбор: (https://github.com/typicode/json-server, https://www.mockapi.io/ или по желанию можно что-то своё).
Поэтому на странице контента появятся две вкладки. Первая: исходный список с возможностью просмотра деталей; вторая: список “отредактированных” записей (без пагинации, фильтров и т.д., но с возможностью просмотра деталей).
На первой странице помечать отредактированные записи соответствующей иконкой в одной из колонок. По нажатию на иконку осуществить переход на страницу со списком записей на редактирование (с текущим выбранным элементом).
На данном этапе “запросы на редактирование” мокай. Отдельная форма для редактирования будет имплементирована в части 3.4.

- Редактирование производить через вызов диалогового окна. Использовать степпер элемент (https://material.angular.io/components/stepper/overview). Т.е., пошаговое изменение разных групп полей. Первая группа: все используемые поля, вторая: пока оставить пустой.

- Кастомный контрол для пола (иконки https://fontawesome.com/icons/female?style=solid, https://fontawesome.com/icons/male?style=solid )

- Редактирование подразумевает также динамическое добавление дополнительных полей. Это значит, что пользователь во время редактирования может выбрать наименование добавляемого поля, его тип (строка, число, булево значение, дата).

Сделать из всего перечисленного кастомный контрол.

Предусмотреть добавление поля (иконка https://fontawesome.com/icons/plus?style=solid напротив инпута для ввода наименования и выбора типа), а также удаление и редактирование (иконки https://fontawesome.com/icons/trash?style=solid и https://fontawesome.com/icons/pen?style=solid соответственно).
Это всё будет содержаться на втором шаге диалогового окна.
Для инпута ввода названия поля навешать кастомный валидатор, проверяющий, что наименования не дублируется.


- В ЛокалСторадж хранить значение под ключом field_offices. Создать интерсептор, который будет добавлять в запрос параметр.
В настройка -- указываем город, по которому запрос. Пустой - по всем, вписанный - сохраняется в field_offices. Поле - лист опшинов, закешированных с предыдущих запросов.

- Настройка столбцов. Количество и порядок. Ограничить до 5-7 штук для одновременного отображения.

- Система комментов. Хранить в своей БД (см. пункт 3.3), отображать в “деталях”, маппать с репонзом по ID записи.
CanDeactivate если коммент еще не сохранён.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.



# Instalation/Launching/Testing

## Install dependencies
Run `npm install` to run all requested dependencies

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Format

Run `npm run lint` or `npm run format` to run eslint/prettier and format your code.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# Conventional Commit Messages 
See how a minor change to your commit message style can make a difference. [Examples](#examples)

## Commit Formats

### Default
<pre>
<b><a href="#types">&lt;type&gt;</a></b></font>(<b><a href="#scopes">&lt;optional scope&gt;</a></b>): <b><a href="#subject">&lt;subject&gt;</a></b>
<sub>empty separator line</sub>
<b><a href="#body">&lt;optional body&gt;</a></b>
<sub>empty separator line</sub>
<b><a href="#footer">&lt;optional footer&gt;</a></b>
</pre>

### Merge
<pre>
Merge branch '<b>&lt;branch name&gt;</b>'
</pre>
<sup>Follows default git merge message</sup>


### Types
* `feat` Commits, that adds a new feature
* `fix` Commits, that fixes a bug
* `refactor` Commits, that rewrite/restructure your code, however does not change any behaviour
    * `perf` Commits are special `refactor` commits, that improve performance
* `style` Commits, that do not affect the meaning (white-space, formatting, missing semi-colons, etc)
* `test` Commits, that add missing tests or correcting existing tests
* `docs` Commits, that affect documentation only
* `build` Commits, that affect build components like build tool, ci pipeline, dependencies, project version, ...
* `ops` Commits, that affect operational components like infrastructure, deployment, backup, recovery, ...
* `chore` Miscellaneous commits e.g. modifying `.gitignore`

### Scopes
The `scope` provides additional contextual information.
* Is an **optional** part of the format
* Allowed Scopes depends on the specific project
* Don't use issue identifiers as scopes

### Subject
The `subject` contains a succinct description of the change.
* Is a **mandatory** part of the format
* Use the imperative, present tense: "change" not "changed" nor "changes"
  * Think of `This commit will <subject>`
* Don't capitalize the first letter
* No dot (.) at the end

### Body
The `body` should include the motivation for the change and contrast this with previous behavior.
* Is an **optional** part of the format
* Use the imperative, present tense: "change" not "changed" nor "changes"
* This is the place to mention issue identifiers and their relations

### Footer
The `footer` should contain any information about **Breaking Changes** and is also the place to **reference Issues** that this commit refers to.
* Is an **optional** part of the format
* **optionally** reference an issue by its id.
* **Breaking Changes** should start with the word `BREAKING CHANGES:` followed by space or two newlines. The rest of the commit message is then used for this.


### Examples
* ```
  feat(shopping cart): add the amazing button
  ```
* ```
  feat: remove ticket list endpoint
  
  refers to JIRA-1337
  BREAKING CHANGES: ticket enpoints no longer supports list all entites.
  ```
* ```
  fix: add missing parameter to service call
  
  The error occurred because of <reasons>.
  ```
* ```
  build(release): bump version to 1.0.0
  ```
* ```
  build: update dependencies
  ```
* ```
  refactor: implement calculation method as recursion
  ```
* ```
  style: remove empty line
  ```
