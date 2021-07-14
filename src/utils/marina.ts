import { MarinaProvider } from 'marina-provider';

export function getMarina(): MarinaProvider {
	const isInstalled = typeof (window as any).marina !== "undefined";
	if (!isInstalled) throw new Error("Marina needs to be installed");

	const marina: MarinaProvider = (window as any).marina;
	return marina;
}