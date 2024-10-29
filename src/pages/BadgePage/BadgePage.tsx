import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Page } from "../../components/page/Page";
import { BadgeFormValues, BadgeModel } from "../../models/badges.model";
import TextField from "../../components/text-field/TextField";
import { badgesService } from "../../services/badges.service";
import { Button } from "../../components/button/Button";

const schema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  image: Yup.string().required(),
});

export const BadgePage = () => {
  const { id } = useParams<{ id: string }>();
  const [badge, setBadge] = useState<BadgeModel>();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BadgeFormValues>({
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchBadge = async (id: string | number) => {
      const response = await badgesService.getBadge(id);
      setBadge(response);
    }

    if (id) {
      fetchBadge(id);
    }
  }, [id]);

  useEffect(() => {
    reset({ name: badge?.name, description: badge?.description, image: badge?.image });
  }, [reset, badge?.name, badge?.description, badge?.image]);

  const onSubmit = async (values: BadgeFormValues) => {
    if (badge?.id) {
      await badgesService.updateBadge(badge.id, values);
    } else {
      await badgesService.createBadge(values);
    }
    goToBadgesPage();
  }

  const goToBadgesPage = () => {
    navigate("/badges");
  };

  return (
    <Page title={badge ? badge.name : "Badge"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="name"
          label="Name"
          register={register}
          error={errors.name?.message}
        />
        <TextField
          name="description"
          label="Description"
          register={register}
          error={errors.description?.message}
        />
        <TextField
          name="image"
          label="Image URL"
          register={register}
          error={errors.image?.message}
        />
        <div className="mt-3">
          <Button color="secondary" type="button" className="me-2" onClick={goToBadgesPage}>
            Back
          </Button>
          <Button type="submit" color="primary">{id ? "Update" : "Create"}</Button>
        </div>
      </form>
    </Page>
  );
};