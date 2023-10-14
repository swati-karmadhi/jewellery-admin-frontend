import React from "react";
import { useAsyncDebounce } from "react-table";
import { Row, Col, CardBody } from "reactstrap";

export default function GlobalFilter({
  searchValue,
  setSearchValue,
  SearchPlaceholder,
  handleSearchEnter,
  children,
}) {
  const [value, setValue] = React.useState(searchValue);
  const onChange = useAsyncDebounce((value) => {
    setSearchValue(value || undefined);
  }, 10);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchEnter(value);
    }
  };

  return (
    <React.Fragment>
      <CardBody className="border border-dashed border-end-0 border-start-0">
        <form>
          <Row>
            <Col sm={4}>
              <div className={`search-box me-2 mb-2 d-inline-block col-12`}>
                <input
                  onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                  }}
                  onKeyDown={handleKeyPress}
                  style={{ background: "#F3F6F9", border: "1px solid #CED4DA" }}
                  id="search-bar-0"
                  type="text"
                  className="form-control  search /"
                  placeholder={SearchPlaceholder}
                  value={searchValue || ""}
                />
                <i className="bx bx-search-alt search-icon"></i>
              </div>
            </Col>
            <Col xl={8}>{children}</Col>
          </Row>
        </form>
      </CardBody>
    </React.Fragment>
  );
}
