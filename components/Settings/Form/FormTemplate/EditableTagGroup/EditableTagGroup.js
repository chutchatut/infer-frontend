import React from "react";
import { Tag, Input, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Initial state = props.initialTags

const tagInput = {
  width: "78px",
  marginRight: "8px",
  verticalAlign: "top",
};

class EditableTagGroup extends React.Component {
  state = {
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  };

  handleClose = (removedTag) => {
    const tags = this.props.value.filter((tag) => tag !== removedTag);
    this.props.onChange(tags);
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let tags = this.props.value;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.props.onChange(tags);
    this.setState({
      inputVisible: false,
      inputValue: "",
    });
    this.showInput();
  };

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = () => {
    this.setState(({ editInputIndex, editInputValue }) => {
      const newTags = [...this.props.value];
      newTags[editInputIndex] = editInputValue;

      this.props.onChange(newTags);

      return {
        editInputIndex: -1,
        editInputValue: "",
      };
    });
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  saveEditInputRef = (input) => {
    this.editInput = input;
  };

  render() {
    const {
      inputVisible,
      inputValue,
      editInputIndex,
      editInputValue,
    } = this.state;
    const tags = this.props.value;
    return (
      <>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                style={tagInput}
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
                onKeyDown={(e) => (e.keyCode == 13 ? e.preventDefault() : "")}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              style={{ userSelect: "none" }}
              key={tag}
              closable={true}
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  if (index !== -1) {
                    this.setState(
                      { editInputIndex: index, editInputValue: tag },
                      () => {
                        this.editInput.focus();
                      }
                    );
                    e.preventDefault();
                  }
                }}
                style={{ fontSize: "1.2em" }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={tagInput}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
            onKeyDown={(e) => (e.keyCode == 13 ? e.preventDefault() : "")}
          />
        )}
        {!inputVisible && (
          <Tag
            style={{ background: "#fff", borderStyle: "dashed" }}
            onClick={this.showInput}
          >
            <PlusOutlined /> Add more
          </Tag>
        )}
      </>
    );
  }
}

export default EditableTagGroup;
