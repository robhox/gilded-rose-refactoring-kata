import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  function update(item: Item): Item {
    return new GildedRose([item]).updateQuality()[0];
  }

  it("returns an empty inventory when there are no items", () => {
    expect(new GildedRose().updateQuality()).toEqual([]);
  });

  describe("ordinary items", () => {
    it("decreases sellIn and quality by one before the sell by date", () => {
      const item = update(new Item("Elixir of the Mongoose", 5, 7));

      expect(item).toEqual(new Item("Elixir of the Mongoose", 4, 6));
    });

    it("decreases quality twice as fast once the sell by date has passed", () => {
      const item = update(new Item("Elixir of the Mongoose", 0, 7));

      expect(item).toEqual(new Item("Elixir of the Mongoose", -1, 5));
    });

    it("never decreases quality below zero", () => {
      const item = update(new Item("Elixir of the Mongoose", 0, 1));

      expect(item).toEqual(new Item("Elixir of the Mongoose", -1, 0));
    });

    it("keeps quality at zero", () => {
      const item = update(new Item("Elixir of the Mongoose", 5, 0));

      expect(item).toEqual(new Item("Elixir of the Mongoose", 4, 0));
    });
  });

  describe("Aged Brie", () => {
    it("increases quality by one before the sell by date", () => {
      const item = update(new Item("Aged Brie", 2, 0));

      expect(item).toEqual(new Item("Aged Brie", 1, 1));
    });

    it("increases quality twice as fast once the sell by date has passed", () => {
      const item = update(new Item("Aged Brie", 0, 10));

      expect(item).toEqual(new Item("Aged Brie", -1, 12));
    });

    it("never increases quality above 50", () => {
      const item = update(new Item("Aged Brie", 0, 49));

      expect(item).toEqual(new Item("Aged Brie", -1, 50));
    });

    it("keeps quality at 50", () => {
      const item = update(new Item("Aged Brie", 5, 50));

      expect(item).toEqual(new Item("Aged Brie", 4, 50));
    });
  });

  describe("Backstage passes", () => {
    const name = "Backstage passes to a TAFKAL80ETC concert";

    it.each([
      { sellIn: 11, quality: 20, expectedSellIn: 10, expectedQuality: 21 },
      { sellIn: 10, quality: 20, expectedSellIn: 9, expectedQuality: 22 },
      { sellIn: 6, quality: 20, expectedSellIn: 5, expectedQuality: 22 },
      { sellIn: 5, quality: 20, expectedSellIn: 4, expectedQuality: 23 },
      { sellIn: 1, quality: 20, expectedSellIn: 0, expectedQuality: 23 },
    ])(
      "updates quality from $quality to $expectedQuality when sellIn is $sellIn",
      ({ sellIn, quality, expectedSellIn, expectedQuality }) => {
        const item = update(new Item(name, sellIn, quality));

        expect(item).toEqual(new Item(name, expectedSellIn, expectedQuality));
      },
    );

    it("drops quality to zero after the concert", () => {
      const item = update(new Item(name, 0, 20));

      expect(item).toEqual(new Item(name, -1, 0));
    });

    it("never increases quality above 50", () => {
      const item = update(new Item(name, 5, 49));

      expect(item).toEqual(new Item(name, 4, 50));
    });
  });

  describe("Sulfuras", () => {
    const name = "Sulfuras, Hand of Ragnaros";

    it.each([1, 0, -1])("never changes when sellIn is %i", (sellIn) => {
      const item = update(new Item(name, sellIn, 80));

      expect(item).toEqual(new Item(name, sellIn, 80));
    });
  });
});
