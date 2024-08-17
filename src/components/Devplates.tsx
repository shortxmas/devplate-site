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
}

const Devplates = () => {
  const [devplates, setDevplates] = useState<Devplate[]>([]);

  useEffect(() => {
    getDevplates().then((val) => {
      setDevplates(val);
      console.log(val);
    });
  }, []);

  const TagBubble = (props: TagBubbleProps) => {
    return (
      <>
        <span key={1} className={`badge bg-primary me-1`}>
          {props.title}
        </span>
      </>
    );
  };

  const DevplateCard = (props: DevplateCardProps) => {
    return (
      <>
        <div className="col-12 col-xs-12 col-lg-6 col-xl-4 my-2">
          <div className="card border-0 bg-light rounded shadow">
            <div className="card-body p-4">
              <h5>{props.title}</h5>
              <div>
                {props.tags.map((val, key) => {
                  return <TagBubble key={key} title={val} />;
                })}
              </div>
              <div className="mt-3">
                <a href="#" className="btn btn-primary">
                  Go to Devplate
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container" style={{ marginTop: 200 }}>
        <div className="row align-items-end mb-4 pb-2">
          <div className="col-md-12">
            <div className="section-title text-center text-md-start">
              <h4 className="title mb-4">Find the perfect jobs</h4>
              <p className="text-muted mb-0 para-desc">
                Start work with Leaping. Build responsive, mobile-first projects
                on the web with the world's most popular front-end component
                library.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {devplates.map((val, key) => (
            <>
              <DevplateCard key={key} title={val.name} tags={[]} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Devplates;
