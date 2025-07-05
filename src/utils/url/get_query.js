let _paramsStr_ = null,
	_pairs_ = null,
	_key_ = null,
	_val_ = null;

export default function getQuery(key, url = window.location.href) {
	_pairs_ = _key_ = _val_ = null;
	_paramsStr_ = decodeURIComponent(url).split("?")[1];

	if (_paramsStr_) {
		_pairs_ = _paramsStr_.split("&");

		for (let i = 0, len = _pairs_.length; i < len; i++) {
			[_key_, _val_] = _pairs_[i].split("=");
			if (_key_ === key) {
				return _val_;
			}
		}
	}
	return null;
}
