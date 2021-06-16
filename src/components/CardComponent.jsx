import { Card } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";

const { Meta } = Card;

function CardItem({ title, description, img }) {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          alt="example"
          src={img}
          height="200px"
        />
      }
      actions={[<Checkbox>Checkbox</Checkbox>]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
}

export default CardItem;
