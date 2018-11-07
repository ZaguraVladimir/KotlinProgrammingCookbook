/**
 * @return {string}
 */
function Syntax(code) {
    const comments = [];	// Тут собираем все каменты
    const strings = [];	// Тут собираем все строки
    const res = [];	// Тут собираем все RegExp
    const all = {'C': comments, 'S': strings, 'R': res};
    const safe = {'<': '<', '>': '>', '&': '&'};

    return code

    // Маскируем HTML
        .replace(/[<>&]/g, function (m) {
            return safe[m];
        })

        // Убираем каменты
        .replace(/\/\*[\s\S]*\*\//g, function (m) {
            const l = comments.length;
            comments.push(m);
            return '~~~C' + l + '~~~';
        })
        .replace(/([^\\])\/\/[^\n]*\n/g, function (m, f) {
            const l = comments.length;
            comments.push(m);
            return f + '~~~C' + l + '~~~';
        })

        // Убираем regexp
        .replace(/\/(\\\/|[^\/\n])*\/[gim]{0,3}/g, function (m) {
            const l = res.length;
            res.push(m);
            return '~~~R' + l + '~~~';
        })

        // Убираем строки
        .replace(/([^\\])((?:'(?:\\'|[^'])*')|(?:"(?:\\"|[^"])*"))/g, function (m, f, s) {
            const l = strings.length;
            strings.push(s);
            return f + '~~~S' + l + '~~~';
        })

        // Выделяем ключевые слова
        .replace(/(object|interface|constructor|class|abstract|companion|data|enum|final|infix|inline|inner|open|override|private|protected|public|init|super|this|fun|null|import|package|typealias|delegate|dynamic|field|file|finally|param|setparam|property|receiver|where|val|var|get|set|vararg|const|lateinit|if|else|when|true|false|for|do|while|break|continue|return|in|!in|is|!is|as|as?|throw|try|catch|actual|annotation|crossinline|expect|external|internal|noinline|operator|out|reified|sealed|suspend|tailrec)([^a-z0-9$_])/gi, '<span class="keyword">$1</span>$2')

        // Выделяем скобки
        .replace(/(\{|\}|\]|\[|\|)/gi, '<span class="gly">$1</span>')

        // Выделяем имена функций
        .replace(/([a-z\_\$][a-z0-9_]*)[\s]*\(/gi, '<span class="func">$1</span>(')

        // Возвращаем на место каменты, строки, RegExp
        .replace(/~~~([CSR])(\d+)~~~/g, function (m, t, i) {
            return '<span class="' + t + '">' + all[t][i] + '</span>';
        })

        // Выставляем переводы строк
        .replace(/\n/g, '<br/>')

        // Табуляцию заменяем неразрывными пробелами
        .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
}