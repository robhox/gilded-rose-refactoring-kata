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
const CONJURED = "Conjured";

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
      this.updateBackstagePass(item);
      return;
    }

    if (item.name.startsWith(CONJURED)) {
      this.updateConjuredItem(item);
      return;
    }

    this.updateRegularItem(item);
  }

  private updateRegularItem(item: Item): void {
    this.decreaseQuality(item);
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }

  private updateConjuredItem(item: Item): void {
    this.decreaseQuality(item, 2);
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      this.decreaseQuality(item, 2);
    }
  }

  private updateAgedBrie(item: Item): void {
    this.increaseQuality(item);
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      this.increaseQuality(item);
    }
  }

  private updateBackstagePass(item: Item): void {
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
  }

  private decreaseQuality(item: Item, amount = 1): void {
    item.quality = Math.max(0, item.quality - amount);
  }

  private increaseQuality(item: Item): void {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }
}
