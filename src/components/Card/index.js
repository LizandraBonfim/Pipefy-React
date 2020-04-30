import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Container, Label } from './styles';
import BoardContent from '../Board/context';


export default function Card({ data, index , listIndex}) {

  const ref = useRef();
  const { move } = useContext(BoardContent);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  })

  const [, drogRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {

      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      console.log(item.index, index)

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedIndex === targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();

      const draggedTop = draggedOffset.y - targetSize.top;


      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }
      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }


      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });
  dragRef(drogRef(ref))
  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}


      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="" />}
    </Container>
  );
}
