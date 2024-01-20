type TElemBucket = [string, string];
type TBucket = TElemBucket[];

class MapClass {
	private buckets: TBucket[] = [[], [], [], [], []];
	private countElements = 0;
	private getHash(key: string, length = 0) {
		let sum = 0;
		for (const it of key) {
			sum += it.charCodeAt(0);
		}
		return sum % (length || this.buckets.length);
	}
	private checkElBucket(el: TBucket | undefined): asserts el is TBucket {
		if (!el) {
			throw new Error("нет бакета");
		}
	}
	private controlCountBuckets(prop = "+") {
		let value: null | -1 | 1 = null;
		if (prop == "+" && this.countElements && this.countElements % 5 == 0) {
			value = 1;
		} else if (prop == "-" && this.buckets.length > 5 && this.buckets.length - this.countElements == 5) {
			value = -1;
		} else {
			return;
		}
		const newBuckets: TBucket[] = [];
		for (let index = 0; index < this.buckets.length + 5 * value; index++) {
			newBuckets.push([]);
		}
		this.copyBuckets(newBuckets);
	}
	private copyBuckets(newBuckets: TBucket[]) {
		console.log(newBuckets.length, "newBuckets.length");
		for (const bucket of this.buckets) {
			for (const [key, value] of bucket) {
				const newBucket = newBuckets[this.getHash(key, newBuckets.length)];
				this.checkElBucket(newBucket);
				newBucket.push([key, value]);
			}
		}
		this.buckets = newBuckets;
	}
	private findElBucket(bucket: TBucket, key: string): TElemBucket | undefined {
		let count = 0;
		const next = (): TElemBucket | undefined => {
			const elemBucket = bucket[count];
			if (!elemBucket) {
				return undefined;
			}
			const [keyB] = elemBucket;
			if (keyB == key) {
				return elemBucket;
			} else {
				count++;
				return next();
			}
		};
		return next();
	}

	set(key: string, value: string) {
		const bucket = this.buckets[this.getHash(key)];
		this.checkElBucket(bucket);
    
		const elBucket = this.findElBucket(bucket, key);
		if (!elBucket) {
			bucket.push([key, value]);
			this.controlCountBuckets();
			this.countElements++;
		} else {
			elBucket[1] = value;
		}
		return this;
	}

	get(key: string) {
		const bucket = this.buckets[this.getHash(key)];
		this.checkElBucket(bucket);
		return this.findElBucket(bucket, key)?.[0];
	}

	has(key: string) {
		return !!this.get(key);
	}

	delete(key: string) {
		const bucket = this.buckets[this.getHash(key)];
		this.checkElBucket(bucket);
		const res = bucket.findIndex(([keyF]) => keyF === key);
		if (res >= 0) {
      bucket.splice(res, 1);
			this.countElements--;
			this.controlCountBuckets("-");
			return true;
		}
		return false;
	}

	clear() {
		this.buckets = [[], [], [], [], []];
	}
}

