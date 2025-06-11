const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Text,
		C3.Plugins.Touch,
		C3.Plugins.System.Cnds.IsGroupActive,
		C3.Plugins.System.Cnds.OnLayoutStart,
		C3.JavaScriptInEvents.Main_Event2_Act1
	];
};
self.C3_JsPropNameTable = [
	{loginTXT: 0},
	{Touch: 0},
	{emailTxT: 0},
	{tokenTXT: 0},
	{atualiza: 0},
	{isLogged: 0},
	{userMail: 0},
	{userTokens: 0}
];

self.InstanceType = {
	loginTXT: class extends self.ITextInstance {},
	Touch: class extends self.IInstance {},
	emailTxT: class extends self.ITextInstance {},
	tokenTXT: class extends self.ITextInstance {},
	atualiza: class extends self.ITextInstance {}
}