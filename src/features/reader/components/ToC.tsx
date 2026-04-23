/* Copyright (c) 2026 Yao Zeran
 * 
 * The ToC component. */


function ToC({ items }) {
  return items.map(item => (
    <div>
      <button onClick={() => goTo(item.href)}>
        {item.label}
      </button>

      {item.children && (
        <div style={{ paddingLeft: 16 }}>
          <ToC items={item.children} />
        </div>
      )}
    </div>
  ))
}


export default ToC;
