Небольшая преамбула - то что у нас существуют отдельные файлы типа desktop/mobile - это нормально.
Требования бизнеса конкретно на этом проекте заключались в отдельных spa под разные девайсы (с общим кодом там где возможно)
Так что на этапе отдачи приложения сервером по header'у клиента проверяется с чего он зашел и отдается нужный вариант
(т.е. у нас все страницы дублируются в desktop/mobile вариантах. Коментировать это не могу. Решение принимали на другом уровне)

Роутинг очень своебразный. Почти все идет через роут /* и дальше через запрос к sql разруливается что это был за компонент
(легаси старого сайта... разобрать по регуляркам оказалось невозможно)

Ну и да, это выдранный компонент который я сейчас рефакторю (раньше не было единого компонента, все руками впихивалось) теперь есть один большой состоящий из кучи мелкихgit init"# componentExample"