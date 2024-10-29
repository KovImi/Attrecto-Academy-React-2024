import React from "react";
import { BadgeModel } from "../../models/badges.model";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Button } from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AccessController from "../access-controller/AccessController";

import classes from "./BadgeCard.module.scss";

interface BadgeCardProps {
  badge: BadgeModel;
  handleDeleteBadge: (badgeId: string) => void;
}

const BadgeCard = ({ badge, handleDeleteBadge }: BadgeCardProps) => {
  const { id, image, name, description } = badge;

  const allowedBadgeChangeFor: Role[] = ["ADMIN"];

  const badgeCardContent = (
    <>
      <div
        className={classes.BadgeImage}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={classNames("card-body", classes.CardBody)}>
        <h5 className={classes.BadgeName}>{name}</h5>
        <p className={classNames("text-black-50", classes.BadgeDescription)}>
          {description}
        </p>
      </div>
      <AccessController allowedFor={allowedBadgeChangeFor}>
        <Button
          className={classes.DeleteIcon}
          onClick={(e) => {
            e.preventDefault();
            handleDeleteBadge(id.toString());
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </AccessController>
    </>
  );

  return (
    <Link to={`/badge/${id}`} className={classNames("card", classes.BadgeCard)}>
      {badgeCardContent}
    </Link>
  );
};

export default BadgeCard;