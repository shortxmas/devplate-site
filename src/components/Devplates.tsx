import * as React from "react";
import { useEffect, useState } from "react";
import { getDevplates } from "../firebase";
import { Devplate } from "../firebase";

interface TagBubbleProps {
  title: string;
}

interface DevplateCardProps {
  title: string;
  tags: string[];
  author: string;
  url: string;
  pullCommand: string;
}

const Devplates = () => {
  const [devplates, setDevplates] = useState<Devplate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [devplatesFailed, setDevplatesFailed] = useState<boolean>(false);

  useEffect(() => {
    try {
      getDevplates().then((val) => {
        setDevplates(val);
        setIsLoading(false);
      });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setDevplatesFailed(true);
    }
  }, []);

  const copyPullCommand = (pullCommand: string): void => {
    navigator.clipboard.writeText(pullCommand);
    alert("Copied Devplate pull command : " + pullCommand);
  };

  const TagBubble = (props: TagBubbleProps) => {
    return (
      <>
        <span className="badge bg-primary me-1">{props.title}</span>
      </>
    );
  };

  const DevplateCard = (props: DevplateCardProps) => {
    return (
      <>
        <div className="col-12 col-xs-12 col-md-6 col-lg-6 col-xl-4 my-2">
          <div className="card border-0 bg-light rounded shadow">
            <div className="card-body p-4">
              <h5>{props.title}</h5>
              <div>
                <a
                  href={`https://github.com/${props.author}`}
                  target="_blank"
                  style={{ color: "black" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    fill="currentColor"
                    className="bi bi-person-circle pe-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                  {props.author}
                </a>
              </div>
              <div className="mt-2">
                {props.tags.map((val, key) => {
                  return <TagBubble key={key} title={val} />;
                })}
              </div>
              <div className="mt-3">
                <a
                  href={props.url}
                  target="_blank"
                  className="btn btn-success me-1 mb-3"
                >
                  Devplate{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    fill="currentColor"
                    className="bi bi-box-arrow-up-right"
                    viewBox="0 0 16 16"
                    style={{ verticalAlign: "baseline" }}
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                    />
                  </svg>
                </a>

                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="BTC Address..."
                    aria-label="BTC Address"
                    aria-describedby="btn01"
                    value={props.pullCommand}
                    readOnly
                  />
                  <button
                    className="btn btn-secondary"
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Copy to Clipboard"
                    onClick={() => {
                      copyPullCommand(props.pullCommand);
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        id="devplates"
        className="container mt-5"
        style={{ marginBottom: 175 }}
      >
        <div className="row align-items-end mb-4 pb-2">
          <div className="col-md-12">
            <div className="section-title text-center text-md-start">
              <h4 className="title mb-4">Search</h4>
              <p className="text-muted mb-0 para-desc">
                Search for keywords in a Devplate you want.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {!isLoading ? (
            <>
              {devplates.map((val, key) => (
                <>
                  <DevplateCard
                    key={key}
                    title={val.name}
                    tags={val.tags}
                    author={val.author}
                    url={val.url}
                    pullCommand={val.pullCommand}
                  />
                </>
              ))}
            </>
          ) : (
            <>
              <div className="d-flex justify-content-center">
                <div className="spinner-border my-3"></div>
              </div>
            </>
          )}
          {devplatesFailed ? (
            <>Something went wrong fetching the Devplates!</>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Devplates;
