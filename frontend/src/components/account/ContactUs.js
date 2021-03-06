import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { AddErrorAction } from "../../actions/ErrorActions";

const { TextArea } = Input;

const ContactUs = ({ AddErrorAction }) => {
  const onFinish = (values) => {
    AddErrorAction("You successfully sent us a message!", "success");
  };
  return (
    <>
      <Form name="basic" onFinish={onFinish} className="productForm">
        <Form.Item
          label="Message"
          name="messaage"
          rules={[{ required: true, message: "Please enter a message!" }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { AddErrorAction };

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
