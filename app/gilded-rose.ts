export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      this.updateItem(item);
    }

    return this.items;
  }

  private updateItem(item: Item): void {
    if (item.name === SULFURAS) {
      return;
    }

    if (item.name === AGED_BRIE) {
      this.updateAgedBrie(item);
      return;
    }

    if (item.name === BACKSTAGE_PASS) {
      this.increaseQuality(item);
      if (item.sellIn < 11) {
        this.increaseQuality(item);
      }
      if (item.sellIn < 6) {
        this.increaseQuality(item);
      }

      item.sellIn = item.sellIn - 1;

      if (item.sellIn < 0) {
        item.quality = 0;
      }

      return;
    }

    this.decreaseQuality(item);
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }

  private updateAgedBrie(item: Item): void {
    this.increaseQuality(item);
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      this.increaseQuality(item);
    }
  }

  private decreaseQuality(item: Item): void {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }

  private increaseQuality(item: Item): void {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }
}
