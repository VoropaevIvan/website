import "./TaskTextForVariant.css";

function TaskTextForVariant() {
  const content = `<p>(И. Карпачёв) На рисунке справа схема дорог Н-ского района изображена в виде графа, звёздочка в ячейке таблицы обозначает наличие дороги между двумя пунктами. Так как таблицу и схему рисовали независимо друг от друга, то нумерация населённых пунктов в таблице никак не связана с буквенными обозначениями на графе.<br><img src="https://www.kpolyakov.spb.ru/cms/images/7002.gif" width="380" height="187"></p>
  <p>Определите длину дороги из пункта Д в пункт Е.</p>`;

  function createMarkup(myContent) {
    return { __html: myContent };
  }
  return (
    <div>
      <p className="varNumberEGE">
        <strong>Задание 1</strong>
      </p>
      <div dangerouslySetInnerHTML={createMarkup(content)} />
    </div>
  );
}

export default TaskTextForVariant;
