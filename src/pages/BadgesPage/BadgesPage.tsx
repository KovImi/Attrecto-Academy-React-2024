import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import { Page } from "../../components/page/Page";
import { BadgeModel } from "../../models/badges.model";
import { badgesService } from "../../services/badges.service";
import { Button } from "../../components/button/Button";
import AccessController from "../../components/access-controller/AccessController";
import BadgeCard from "../../components/badge-card/BadgeCard";

import classes from "./Badges.module.scss";

const BadgesPage = () => {
  const [badges, setBadges] = useState<BadgeModel[]>([]);
  const navigate = useNavigate();

  const fetchBadges = useCallback(async () => {
    setBadges(await badgesService.getBadges());
  }, []);

  useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  const goToBadgePage = () => {
    navigate("/badge");
  };

  const handleDeleteBadge = async (id: string | number) => {
    await badgesService.deleteBadge(id);
    fetchBadges();
  };

  return (
    <Page title="Badges">
      <AccessController allowedFor={["ADMIN"]}>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Button color="primary" className="w-100 mb-3" onClick={goToBadgePage}>
              Create Badge
            </Button>
          </div>
        </div>
      </AccessController>
      <div className="row">
        {badges.map((badge) => (
          <div key={badge.id} className="col-12 col-sm-6 col-md-4 col-lg-3 my-1">
            <BadgeCard badge={badge} handleDeleteBadge={handleDeleteBadge} />
          </div>
        ))}
      </div>
    </Page>
  );
};

export default BadgesPage;