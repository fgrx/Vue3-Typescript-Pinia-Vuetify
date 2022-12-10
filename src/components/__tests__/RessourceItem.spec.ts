import RessourceItem from "../RessourceItem.vue";
import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import IRessource from "@/interfaces/iRessource";

describe(">>>>>>>>RessourceItem.vue", () => {
  const ressource: IRessource = {
    date: "2021-07-21T12:28:43.447Z",
    title: "Refactoring Comment améliorer le code existant",
    lang: "fr",
    media: "book",
    url: "https://www.dunod.com/sciences-techniques/refactoring-comment-ameliorer-code-existant",
    rating: 3,
    isTop: false,
    isValid: true,
    image:
      "https://www.dunod.com/sites/default/files/styles/principal_desktop/public/thumbnails/image/9782100801169-001-X.jpeg",
    id: "dv6tYa8",
    description:
      "Le refactoring, ou ré-ingénierie du code, est l'opération consistant à retravailler le code source d'un programme de façon à en améliorer la lisibilité et par voie de conséquence la maintenance. Il ne s'agit pas de le compléter ou d'en corriger des bugs, mais d'en améliorer la structure sans en altérer le fonctionnement.",
  };

  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(RessourceItem, {
      props: {
        isBookmark: false,
        ressource,
      },
      global: {
        stubs: ["router-link"],
      },
    });
  });

  it("should contain a card with a title", () => {
    const title = wrapper.find("[data-test-id='title']").text();
    expect(title).toContain(ressource.title);
  });

  it("Should contain add to list button", () => {
    const addButton = wrapper.find("[data-test-id='addButton']");
    expect(addButton.exists()).toBeTruthy();
  });

  it("Should emit an event on addButton clicked", async () => {
    const addButton = wrapper.find("[data-test-id='addButton']");
    await addButton.trigger("click");
    const eventsEmitted = wrapper.emitted();

    expect(eventsEmitted["add-to-bookmarks"]).toBeTruthy();
  });
});
