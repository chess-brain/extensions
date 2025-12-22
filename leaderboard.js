(function () {
	class Leaderboard {
		constructor(runtime) {
			this.runtime = runtime;
			this.storageKey = 'achieve_and_leaderboard';
			this._port = 'default';
			this._inMemoryStore = {};
 			this._cloudProvider = null;
 			this._cloudAutoSync = false;
			this._overlayElement = null;
			this._overlayMode = null;
			this._overlayContext = null;
			this._stylesInjected = false;
			this._lang = this._detectLang();
			const vers_num = '1.2.0';
			const build_type = 1;
			const build_version = '001';
			const version = vers_num + ['-alpha-', '-beta-', '-release-'][build_type] + build_version;
			this._translations = {
				'zh-cn': {
					extName: '成就与排行榜',
					label_version: 'V' + version,
					docLink: '查看文档',
					leaderboard: '排行榜',
					createBoard: '创建排行榜 [BOARD]',
					submitScore: '提交分数 名称 [NAME] 分数 [SCORE] 到 [BOARD]',
					getTop: '获取前 [N] 名 从 [BOARD]',
					getRank: '查询 名称 [NAME] 在 [BOARD] 的名次',
					getHighScore: '查询 名称 [NAME] 在 [BOARD] 的最高分',
					resetBoard: '重置排行榜 [BOARD]',
					getAllData: '整个排行榜数据',
					toggleDisplay: '[TOGGLE] 排行榜 [BOARD]',
					achievements: '成就系统',
					createAchievement: '创建成就 ID [ID] 名称 [NAME] 标签 [TAG]',
					awardAchievement: '颁发成就 ID [ID] 标签 [TAG] 给 用户 [PLAYER] （可选名称 [NAME]） 并 [DISPLAY] 给用户',
					isAchievementUnlocked: '成就 ID [ID] 在 标签 [TAG] 是否被 用户 [PLAYER] 解锁',
					toggleAchievementsDisplay: '[TOGGLE] 成就 标签 [TAG] 用户 [PLAYER]',
					show: '显示',
					hide: '隐藏',
					refresh: '刷新',
					close: '关闭',
					nameHeader: '名称',
					scoreHeader: '分数',
					noData: '(无数据)',
					noAchievements: '(无成就)',
					moreRecords: '... 还有 {n} 条记录',
					unlocked: '已解锁',
					locked: '未解锁',
					leaderboardTitle: '排行榜：{board}',
					achievementsTitle: '成就：{tag}（用户：{player}）'
				},
				'en': {
					extName: 'Achievements & Leaderboards',
					label_version: 'V' + version,
					docLink: 'View Docs',
					leaderboard: 'Leaderboard',
					createBoard: 'Create board [BOARD]',
					submitScore: 'Submit score NAME [NAME] SCORE [SCORE] to [BOARD]',
					getTop: 'Get top [N] from [BOARD]',
					getRank: 'Get rank of NAME [NAME] on [BOARD]',
					getHighScore: 'Get high score of NAME [NAME] on [BOARD]',
					resetBoard: 'Reset board [BOARD]',
					getAllData: 'All leaderboard data',
					toggleDisplay: '[TOGGLE] leaderboard [BOARD]',
					achievements: 'Achievements',
					createAchievement: 'Create achievement ID [ID] NAME [NAME] TAG [TAG]',
					awardAchievement: 'Award achievement ID [ID] TAG [TAG] to PLAYER [PLAYER] (opt NAME [NAME]) and [DISPLAY] to player',
					isAchievementUnlocked: 'Is achievement ID [ID] in TAG [TAG] unlocked by PLAYER [PLAYER]',
					toggleAchievementsDisplay: '[TOGGLE] achievements TAG [TAG] PLAYER [PLAYER]',
					show: 'Show',
					hide: 'Hide',
					refresh: 'Refresh',
					close: 'Close',
					nameHeader: 'Name',
					scoreHeader: 'Score',
					noData: '(no data)',
					noAchievements: '(no achievements)',
					moreRecords: '... {n} more records',
					unlocked: 'Unlocked',
					locked: 'Locked',
					leaderboardTitle: 'Leaderboard: {board}',
					achievementsTitle: 'Achievements: {tag} (Player: {player})'
				},
				'fr': {
					extName: 'Succès et Classements',
					label0: 'Classement & Succès',
					label_version: 'V' + version,
					docLink: 'Voir la doc',
					leaderboard: 'Classement',
					createBoard: 'Créer classement [BOARD]',
					submitScore: 'Soumettre score NOM [NAME] SCORE [SCORE] à [BOARD]',
					getTop: 'Obtenir top [N] de [BOARD]',
					getRank: 'Rang de NOM [NAME] sur [BOARD]',
					getHighScore: 'Meilleur score de NOM [NAME] sur [BOARD]',
					resetBoard: 'Réinitialiser [BOARD]',
					getAllData: 'Toutes les données',
					toggleDisplay: '[TOGGLE] classement [BOARD]',
					achievements: 'Succès',
					createAchievement: 'Créer succès ID [ID] NOM [NAME] TAG [TAG]',
					awardAchievement: 'Attribuer succès ID [ID] TAG [TAG] à JOUEUR [PLAYER] (opt NOM [NAME]) et [DISPLAY] au joueur',
					isAchievementUnlocked: 'Succès ID [ID] TAG [TAG] débloqué par JOUEUR [PLAYER] ?',
					toggleAchievementsDisplay: '[TOGGLE] succès TAG [TAG] JOUEUR [PLAYER]',
					show: 'Afficher',
					hide: 'Masquer',
					refresh: 'Rafraîchir',
					close: 'Fermer',
					nameHeader: 'Nom',
					scoreHeader: 'Score',
					noData: '(aucune donnée)',
					noAchievements: '(aucun succès)',
					moreRecords: '... {n} autres enregistrements',
					unlocked: 'Débloqué',
					locked: 'Verrouillé',
					leaderboardTitle: 'Classement : {board}',
					achievementsTitle: 'Succès : {tag} (Joueur : {player})'
				},
				'es': {
					extName: 'Logros y Clasificación',
					label_version: 'V' + version,
					docLink: 'Ver documentación',
					leaderboard: 'Clasificación',
					createBoard: 'Crear clasificación [BOARD]',
					submitScore: 'Enviar puntuación NOMBRE [NAME] PUNT [SCORE] a [BOARD]',
					getTop: 'Obtener top [N] de [BOARD]',
					getRank: 'Rango de NOMBRE [NAME] en [BOARD]',
					getHighScore: 'Mejor puntuación de NOMBRE [NAME] en [BOARD]',
					resetBoard: 'Reiniciar [BOARD]',
					getAllData: 'Todos los datos',
					toggleDisplay: '[TOGGLE] clasificación [BOARD]',
					achievements: 'Logros',
					createAchievement: 'Crear logro ID [ID] NOMBRE [NAME] TAG [TAG]',
					awardAchievement: 'Otorgar logro ID [ID] TAG [TAG] a JUGADOR [PLAYER] (opt NOMBRE [NAME]) y [DISPLAY] al jugador',
					isAchievementUnlocked: '¿Logro ID [ID] TAG [TAG] desbloqueado por JUGADOR [PLAYER]?',
					toggleAchievementsDisplay: '[TOGGLE] logros TAG [TAG] JUGADOR [PLAYER]',
					show: 'Mostrar',
					hide: 'Ocultar',
					refresh: 'Actualizar',
					close: 'Cerrar',
					nameHeader: 'Nombre',
					scoreHeader: 'Puntos',
					noData: '(sin datos)',
					noAchievements: '(sin logros)',
					moreRecords: '... {n} registros más',
					unlocked: 'Desbloqueado',
					locked: 'Bloqueado',
					leaderboardTitle: 'Clasificación: {board}',
					achievementsTitle: 'Logros: {tag} (Usuario: {player})'
				},
				'ru': {
					extName: 'Достижения и Таблицы лидеров',
					label_version: 'V' + version,
					docLink: 'Открыть документацию',
					leaderboard: 'Таблица лидеров',
					createBoard: 'Создать таблицу [BOARD]',
					submitScore: 'Отправить очки ИМЯ [NAME] ОЧКИ [SCORE] в [BOARD]',
					getTop: 'Получить топ [N] из [BOARD]',
					getRank: 'Ранг ИМЯ [NAME] в [BOARD]',
					getHighScore: 'Лучший счет ИМЯ [NAME] в [BOARD]',
					resetBoard: 'Сбросить [BOARD]',
					getAllData: 'Все данные',
					toggleDisplay: '[TOGGLE] таблица [BOARD]',
					achievements: 'Достижения',
					createAchievement: 'Создать достижение ID [ID] ИМЯ [NAME] TAG [TAG]',
					awardAchievement: 'Вручить достижение ID [ID] TAG [TAG] игроку [PLAYER] (имя [NAME]) и [DISPLAY]',
					isAchievementUnlocked: 'Достижение ID [ID] в TAG [TAG] разблокировано игроком [PLAYER] ?',
					toggleAchievementsDisplay: '[TOGGLE] достижения TAG [TAG] ИГРОК [PLAYER]',
					show: 'Показать',
					hide: 'Скрыть',
					refresh: 'Обновить',
					close: 'Закрыть',
					nameHeader: 'Имя',
					scoreHeader: 'Очки',
					noData: '(нет данных)',
					noAchievements: '(нет достижений)',
					moreRecords: '... ещё {n} записей',
					unlocked: 'Разблокировано',
					locked: 'Заблокировано',
					leaderboardTitle: 'Таблица: {board}',
					achievementsTitle: 'Достижения: {tag} (Игрок: {player})'
				},
				'ar': {
					extName: 'الإنجازات ولوائح المتصدرين',
					label_version: 'V' + version,
					docLink: 'عرض الوثائق',
					leaderboard: 'قائمة المتصدرين',
					createBoard: 'إنشاء قائمة [BOARD]',
					submitScore: 'إرسال نقاط الاسم [NAME] النقاط [SCORE] إلى [BOARD]',
					getTop: 'الحصول على أعلى [N] من [BOARD]',
					getRank: 'ترتيب الاسم [NAME] في [BOARD]',
					getHighScore: 'أفضل نتيجة للاسم [NAME] في [BOARD]',
					resetBoard: 'إعادة تعيين [BOARD]',
					getAllData: 'جميع البيانات',
					toggleDisplay: '[TOGGLE] قائمة [BOARD]',
					achievements: 'الإنجازات',
					createAchievement: 'إنشاء إنجاز ID [ID] الاسم [NAME] الوسم [TAG]',
					awardAchievement: 'منح إنجاز ID [ID] الوسم [TAG] للاعب [PLAYER] (الاسم [NAME]) و[DISPLAY]',
					isAchievementUnlocked: 'هل الإنجاز ID [ID] في الوسم [TAG] تم فتحه بواسطة [PLAYER]؟',
					toggleAchievementsDisplay: '[TOGGLE] إنجازات الوسم [TAG] اللاعب [PLAYER]',
					show: 'عرض',
					hide: 'إخفاء',
					refresh: 'تحديث',
					close: 'إغلاق',
					nameHeader: 'الاسم',
					scoreHeader: 'النقاط',
					noData: '(لا توجد بيانات)',
					noAchievements: '(لا توجد إنجازات)',
					moreRecords: '... {n} سجلات أخرى',
					unlocked: 'تم الفتح',
					locked: 'مقفل',
					leaderboardTitle: 'قائمة: {board}',
					achievementsTitle: 'الإنجازات: {tag} (المستخدم: {player})'
				},
				'ja': {
					extName: '実績とランキング',
					label_version: 'V' + version,
					docLink: 'ドキュメントを見る',
					leaderboard: 'ランキング',
					createBoard: 'ランキング作成 [BOARD]',
					submitScore: 'スコアを送信 名前 [NAME] スコア [SCORE] へ [BOARD]',
					getTop: '[BOARD] の上位 [N] を取得',
					getRank: '[BOARD] の 名前 [NAME] の順位',
					getHighScore: '[BOARD] の 名前 [NAME] の最高スコア',
					resetBoard: 'ランキングをリセット [BOARD]',
					getAllData: 'すべてのデータ',
					toggleDisplay: '[TOGGLE] ランキング [BOARD]',
					achievements: '実績',
					createAchievement: '実績作成 ID [ID] 名前 [NAME] タグ [TAG]',
					awardAchievement: '実績 ID [ID] タグ [TAG] を プレイヤー [PLAYER] に付与 (名前 [NAME]) と[DISPLAY]',
					isAchievementUnlocked: '実績 ID [ID] タグ [TAG] が プレイヤー [PLAYER] によって解除されているか',
					toggleAchievementsDisplay: '[TOGGLE] 実績 タグ [TAG] プレイヤー [PLAYER]',
					show: '表示',
					hide: '非表示',
					refresh: '更新',
					close: '閉じる',
					nameHeader: '名前',
					scoreHeader: 'スコア',
					noData: '(データなし)',
					noAchievements: '(実績なし)',
					moreRecords: '... あと {n} 件',
					unlocked: '解除済み',
					locked: 'ロック中',
					leaderboardTitle: 'ランキング：{board}',
					achievementsTitle: '実績：{tag}（プレイヤー：{player}）'
				},
				'ko': {
					extName: '업적 및 순위표',
					label_version: 'V' + version,
					docLink: '문서 보기',
					leaderboard: '순위표',
					createBoard: '순위표 생성 [BOARD]',
					submitScore: '점수 제출 이름 [NAME] 점수 [SCORE] 에 [BOARD]',
					getTop: '[BOARD] 에서 상위 [N] 가져오기',
					getRank: '[BOARD] 에서 이름 [NAME] 랭크',
					getHighScore: '[BOARD] 에서 이름 [NAME] 최고점',
					resetBoard: '순위표 초기화 [BOARD]',
					getAllData: '모든 데이터',
					toggleDisplay: '[TOGGLE] 순위표 [BOARD]',
					achievements: '업적',
					createAchievement: '업적 생성 ID [ID] 이름 [NAME] 태그 [TAG]',
					awardAchievement: '업적 ID [ID] 태그 [TAG] 를 플레이어 [PLAYER] 에게 수여 (이름 [NAME]) 및 [DISPLAY]',
					isAchievementUnlocked: '업적 ID [ID] 태그 [TAG] 이 플레이어 [PLAYER] 에 의해 해제되었는가?',
					toggleAchievementsDisplay: '[TOGGLE] 업적 태그 [TAG] 플레이어 [PLAYER]',
					show: '표시',
					hide: '숨기기',
					refresh: '새로고침',
					close: '닫기',
					nameHeader: '이름',
					scoreHeader: '점수',
					noData: '(데이터 없음)',
					noAchievements: '(업적 없음)',
					moreRecords: '... {n} 개의 추가 기록',
					unlocked: '해제됨',
					locked: '잠김',
					leaderboardTitle: '순위표: {board}',
					achievementsTitle: '업적: {tag} (사용자: {player})'
				},
				'pt': {
					extName: 'Conquistas e Rankings',
					label_version: 'V' + version,
					docLink: 'Ver documentação',
					leaderboard: 'Ranking',
					createBoard: 'Criar ranking [BOARD]',
					submitScore: 'Enviar pontuação NOME [NAME] PONT [SCORE] para [BOARD]',
					getTop: 'Obter top [N] de [BOARD]',
					getRank: 'Posição de NOME [NAME] em [BOARD]',
					getHighScore: 'Maior pontuação de NOME [NAME] em [BOARD]',
					resetBoard: 'Resetar [BOARD]',
					getAllData: 'Todos os dados',
					toggleDisplay: '[TOGGLE] ranking [BOARD]',
					achievements: 'Conquistas',
					createAchievement: 'Criar conquista ID [ID] NOME [NAME] TAG [TAG]',
					awardAchievement: 'Conceder conquista ID [ID] TAG [TAG] para JOGADOR [PLAYER] (nome [NAME]) e [DISPLAY] ao jogador',
					isAchievementUnlocked: 'Conquista ID [ID] TAG [TAG] desbloqueada por JOGADOR [PLAYER] ?',
					toggleAchievementsDisplay: '[TOGGLE] conquistas TAG [TAG] JOGADOR [PLAYER]',
					show: 'Mostrar',
					hide: 'Esconder',
					refresh: 'Atualizar',
					close: 'Fechar',
					nameHeader: 'Nome',
					scoreHeader: 'Pontos',
					noData: '(sem dados)',
					noAchievements: '(sem conquistas)',
					moreRecords: '... {n} registros a mais',
					unlocked: 'Desbloqueado',
					locked: 'Bloqueado',
					leaderboardTitle: 'Ranking: {board}',
					achievementsTitle: 'Conquistas: {tag} (Jogador: {player})'
				},
				'it': {
					extName: 'Obiettivi e Classifiche',
					label_version: 'V' + version,
					docLink: 'Vedi documentazione',
					leaderboard: 'Classifica',
					createBoard: 'Crea classifica [BOARD]',
					submitScore: 'Invia punteggio NOME [NAME] PUNT [SCORE] a [BOARD]',
					getTop: 'Prendi top [N] da [BOARD]',
					getRank: 'Classifica di NOME [NAME] su [BOARD]',
					getHighScore: 'Miglior punteggio di NOME [NAME] su [BOARD]',
					resetBoard: 'Resetta [BOARD]',
					getAllData: 'Tutti i dati',
					toggleDisplay: '[TOGGLE] classifica [BOARD]',
					achievements: 'Obiettivi',
					createAchievement: 'Crea obiettivo ID [ID] NOME [NAME] TAG [TAG]',
					awardAchievement: 'Assegna obiettivo ID [ID] TAG [TAG] a GIOCATORE [PLAYER] (nome [NAME]) e [DISPLAY] al giocatore',
					isAchievementUnlocked: 'Obiettivo ID [ID] TAG [TAG] sbloccato da GIOCATORE [PLAYER] ?',
					toggleAchievementsDisplay: '[TOGGLE] obiettivi TAG [TAG] GIOCATORE [PLAYER]',
					show: 'Mostra',
					hide: 'Nascondi',
					refresh: 'Aggiorna',
					close: 'Chiudi',
					nameHeader: 'Nome',
					scoreHeader: 'Punteggio',
					noData: '(nessun dato)',
					noAchievements: '(nessun obiettivo)',
					moreRecords: '... {n} record in più',
					unlocked: 'Sbloccato',
					locked: 'Bloccato',
					leaderboardTitle: 'Classifica: {board}',
					achievementsTitle: 'Obiettivi: {tag} (Giocatore: {player})'
				}
			};
		}

		_detectLang() {
			try {
				const nav = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language.toLowerCase() : 'en';
				if (nav.startsWith('zh')) return 'zh-cn';
				if (nav.startsWith('fr')) return 'fr';
				if (nav.startsWith('es')) return 'es';
				if (nav.startsWith('ru')) return 'ru';
				if (nav.startsWith('ar')) return 'ar';
				if (nav.startsWith('ja')) return 'ja';
				if (nav.startsWith('ko')) return 'ko';
				if (nav.startsWith('pt')) return 'pt';
				if (nav.startsWith('it')) return 'it';
				return 'en';
			} catch (e) {
				return 'en';
			}
		}

		_t(key, vars) {
			const dict = this._translations && this._translations[this._lang] ? this._translations[this._lang] : this._translations['en'];
			let s = (dict && dict[key]) ? dict[key] : (this._translations['en'][key] || key);
			if (vars && typeof vars === 'object') {
				Object.keys(vars).forEach(k => {
					s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(vars[k]));
				});
			}
			return s;
		}

		getInfo() {
			const B = (window.Scratch && window.Scratch.BlockType) ? window.Scratch.BlockType : { COMMAND: 'command', REPORTER: 'reporter' };
			const A = (window.Scratch && window.Scratch.ArgumentType) ? window.Scratch.ArgumentType : { STRING: 'string', NUMBER: 'number' };
			const BUTTON = (B && B.BUTTON) ? B.BUTTON : B.COMMAND;
            return {
				id: 'leaderboard',
				name: this._t('extName'),
				color1: '#3494fc',
				color2: '#3494fc',
				color3: '#3494fc',
				blocks: [
                    { opcode: 'label', blockType: B.LABEL, text: `——— ${this._t('extName')} ———` },
                    { opcode: 'label_version', blockType: B.LABEL, text: this._t('label_version')},
                    { opcode: 'docLink', blockType: B.COMMAND, text: '🏆 ' + this._t('docLink') },
					{ opcode: 'leaderboard_text', blockType: B.LABEL, text: ` ${this._t('leaderboard')}`},
					{ opcode: 'createBoard', blockType: B.COMMAND, text: '🏆 ' + this._t('createBoard'),
						arguments: { BOARD: { type: A.STRING, defaultValue: '默认排行榜' } } },
					{ opcode: 'submitScore', blockType: B.COMMAND, text: '🏆 ' + this._t('submitScore'),
						arguments: { NAME: { type: A.STRING, defaultValue: '玩家' }, SCORE: { type: A.NUMBER, defaultValue: 0 }, BOARD: { type: A.STRING, defaultValue: '默认排行榜' } } },
					{ opcode: 'getTop', blockType: B.REPORTER, text: '🏆 ' + this._t('getTop'),
						arguments: { N: { type: A.NUMBER, defaultValue: 10 }, BOARD: { type: A.STRING, defaultValue: '默认排行榜' } } },
					{ opcode: 'getRank', blockType: B.REPORTER, text: '🏆 ' + this._t('getRank'),
						arguments: { NAME: { type: A.STRING, defaultValue: '玩家' }, BOARD: { type: A.STRING, defaultValue: '默认排行榜' } } },
					{ opcode: 'getHighScore', blockType: B.REPORTER, text: '🏆 ' + this._t('getHighScore'),
						arguments: { NAME: { type: A.STRING, defaultValue: '玩家' }, BOARD: { type: A.STRING, defaultValue: '默认排行榜' } } },
					{ opcode: 'resetBoard', blockType: B.COMMAND, text: '🏆 ' + this._t('resetBoard'),
						arguments: { BOARD: { type: A.STRING, defaultValue: '默认排行榜' } } },
					{ opcode: 'getAllData', blockType: B.REPORTER, text: '🏆 ' + this._t('getAllData') },
					{ opcode: 'toggleDisplay', blockType: B.COMMAND, text: '🏆 ' + this._t('toggleDisplay'),
						arguments: { TOGGLE: {type: A.STRING, menu: 'toggle'}, BOARD: { type: A.STRING, defaultValue: '默认排行榜' } } },
					{ opcode: 'cloud_text', blockType: B.LABEL, text: ' 云存储' },
					{ opcode: 'pushAllToCloud', blockType: B.COMMAND, text: '推送全部到云端' },
					{ opcode: 'pullAllFromCloud', blockType: B.COMMAND, text: '从云端拉取全部' },
					{ opcode: 'setPort', blockType: B.COMMAND, text: '设置端口 [PORT]', arguments: { PORT: { type: A.STRING, defaultValue: 'default' } } },
					{ opcode: 'getPort', blockType: B.REPORTER, text: '当前端口' },
					{ opcode: 'setCloudAutoSync', blockType: B.COMMAND, text: '自动云同步 [TOGGLE]',
						arguments: { TOGGLE: { type: A.STRING, menu: 'toggle' } } },
					{ opcode: 'achievement_text', blockType: B.LABEL, text: ` ${this._t('achievements')}`},
					{ opcode: 'createAchievement', blockType: B.COMMAND, text: '🏆 ' + this._t('createAchievement'),
						arguments: { ID: { type: A.STRING, defaultValue: 'achv1' }, NAME: { type: A.STRING, defaultValue: '成就名称' }, TAG: { type: A.STRING, defaultValue: '默认标签' } } },
					{ opcode: 'awardAchievement', blockType: B.COMMAND, text: '🏆 ' + this._t('awardAchievement'),
						arguments: { ID: { type: A.STRING, defaultValue: 'achv1' }, TAG: { type: A.STRING, defaultValue: '默认标签' }, PLAYER: { type: A.STRING, defaultValue: '玩家' }, NAME: { type: A.STRING, defaultValue: '' }, DISPLAY: { type: A.STRING, menu: 'display' } } },
					{ opcode: 'isAchievementUnlocked', blockType: B.REPORTER, text: '🏆 ' + this._t('isAchievementUnlocked'),
						arguments: { ID: { type: A.STRING, defaultValue: 'achv1' }, TAG: { type: A.STRING, defaultValue: '默认标签' }, PLAYER: { type: A.STRING, defaultValue: '玩家' } } },
					{ opcode: 'toggleAchievementsDisplay', blockType: B.COMMAND, text: '🏆 ' + this._t('toggleAchievementsDisplay'),
						arguments: { TOGGLE: {type: A.STRING, menu: 'toggle'}, TAG: { type: A.STRING, defaultValue: '默认标签' }, PLAYER: { type: A.STRING, defaultValue: '玩家' } } }
					,{ opcode: 'resetAllAchievements', blockType: B.COMMAND, text: '🏆 清空成就表单' }
				],
				menus: {
                    toggle: [
                        { text: this._t('show'), value: 'open' },
                        { text: this._t('hide'), value: 'close' }
                    ],
 					display: [
 						{ text: this._t('show'), value: 'show' },
 						{ text: this._t('hide'), value: 'hide' }
 					]
                 }
 			};
 		}

		_storageKeyForPort() {
			return String(this.storageKey || 'achieve_and_leaderboard') + ':' + String(this._port || 'default');
		}

		_loadAll() {
			try {
				if (typeof localStorage !== 'undefined') {
					const key = this._storageKeyForPort();
					const raw = localStorage.getItem(key);
					if (raw) {
						try { return JSON.parse(raw); } catch (e) {}
					}
					const legacyRaw = localStorage.getItem(this.storageKey);
					if (legacyRaw) {
						try {
							const parsed = JSON.parse(legacyRaw);
							try { localStorage.setItem(key, JSON.stringify(parsed)); } catch (e) {}
							return parsed;
						} catch (e) {}
					}
				}
			} catch (e) {}
			return this._inMemoryStore[this._port] ? this._inMemoryStore[this._port] : {};
 		}
 
 		_saveAll(data) {
			try {
				const key = this._storageKeyForPort();
				if (typeof localStorage !== 'undefined') {
					localStorage.setItem(key, JSON.stringify(data));
				} else {
					this._inMemoryStore[this._port] = data;
				}
			} catch (e) {
				this._inMemoryStore[this._port] = data;
			}
			if (this._cloudProvider && this._cloudAutoSync && typeof this._cloudProvider.upload === 'function') {
				try {
					const payload = JSON.stringify(data);
					Promise.resolve(this._cloudProvider.upload(this._storageKeyForPort(), payload)).catch(() => {});
				} catch (e) {}
			}
 		}
 
 		registerCloudProvider(provider) {
 			if (!provider) return false;
 			this._cloudProvider = provider;
 			return true;
 		}
 
 		async _pushAllToCloud() {
			if (!this._cloudProvider || typeof this._cloudProvider.upload !== 'function') return false;
			const all = this._loadAll();
			try {
				await this._cloudProvider.upload(this._storageKeyForPort(), JSON.stringify(all));
				return true;
			} catch (e) {
				return false;
			}
 		}
 
 		async _pullAllFromCloud() {
			if (!this._cloudProvider || typeof this._cloudProvider.download !== 'function') return false;
			try {
				const raw = await this._cloudProvider.download(this._storageKeyForPort());
				if (!raw) return false;
				let parsed = {};
				try { parsed = JSON.parse(raw); } catch (e) { return false; }
				this._saveAll(parsed);
				return true;
			} catch (e) {
				return false;
			}
 		}
 
 		pushAllToCloud(args) {
 			if (typeof this._pushAllToCloud === 'function') this._pushAllToCloud().catch(() => {});
 		}
 
 		pullAllFromCloud(args) {
 			if (typeof this._pullAllFromCloud === 'function') this._pullAllFromCloud().catch(() => {});
 		}
 
 		setCloudAutoSync(args) {
 			const toggle = String((args && args.TOGGLE) || '').toLowerCase();
 			if (toggle === 'open' || toggle === 'show' || toggle === 'true' || toggle === '1') this.setCloudAutoSyncEnabled(true);
 			else if (toggle === 'close' || toggle === 'hide' || toggle === 'false' || toggle === '0') this.setCloudAutoSyncEnabled(false);
 		}
 
 		setCloudAutoSyncEnabled(enabled) {
 			this._cloudAutoSync = !!enabled;
 		}
 
 		_ensureBoard(data, board) {
 			if (!data[board]) data[board] = {};
 			return data[board];
 		}

        docLink() {
            const url = 'https://chess-brain.github.io/doc/achievements_and_leaderboards.html';
            if (typeof window === 'undefined') return;
            try {
                this._openUrl(url);
            } catch (e) {}
        }

		createBoard(args) {
			const board = String(args.BOARD || '默认排行榜');
			const all = this._loadAll();
			this._ensureBoard(all, board);
			this._saveAll(all);
		}

		submitScore(args) {
			const board = String(args.BOARD || '默认排行榜');
			const name = String(args.NAME || '玩家');
			const score = Number(args.SCORE) || 0;
			const all = this._loadAll();
			const b = this._ensureBoard(all, board);
			const prev = b[name];
			const now = Date.now();
			if (!prev || score > prev.score || (score === prev.score && now < prev.ts)) {
				b[name] = { score: score, ts: now };
			}
			this._saveAll(all);
		}

		getTop(args) {
			const board = String(args.BOARD || '默认排行榜');
			const n = Math.max(0, Math.floor(Number(args.N) || 0));
			const all = this._loadAll();
			const b = all[board] || {};
			const arr = Object.keys(b).map(name => ({ name, score: Number(b[name].score), ts: Number(b[name].ts) }));
			arr.sort((a, c) => {
				if (c.score !== a.score) return c.score - a.score;
				return a.ts - c.ts;
			});
			const top = arr.slice(0, n).map((item, idx) => ({ rank: idx + 1, name: item.name, score: item.score }));
			try {
				return JSON.stringify(top);
			} catch (e) {
				return '[]';
			}
		}

		getRank(args) {
			const board = String(args.BOARD || '默认排行榜');
			const name = String(args.NAME || '玩家');
			const all = this._loadAll();
			const b = all[board] || {};
			const arr = Object.keys(b).map(nm => ({ name: nm, score: Number(b[nm].score), ts: Number(b[nm].ts) }));
			arr.sort((a, c) => {
				if (c.score !== a.score) return c.score - a.score;
				return a.ts - c.ts;
			});
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].name === name) return i + 1;
			}
			return 0;
		}

		getHighScore(args) {
			const board = String(args.BOARD || '默认排行榜');
			const name = String(args.NAME || '玩家');
			const all = this._loadAll();
			const b = all[board] || {};
			const entry = b[name];
			return entry ? Number(entry.score) : 0;
		}

		resetBoard(args) {
			const board = String(args.BOARD || '默认排行榜');
			const all = this._loadAll();
			if (all[board]) delete all[board];
			this._saveAll(all);
		}

		getAllData() {
			const all = this._loadAll();
			all.__achievements_meta = all.__achievements_meta || {};
			all.__achievements_unlocked = all.__achievements_unlocked || {};
			try {
				return JSON.stringify(all);
			} catch (e) {
				return '{}';
			}
		}

		toggleDisplay(args) {
			const toggle = String((args.TOGGLE || '')).toLowerCase();
			const board = String(args.BOARD || '默认排行榜').trim();
			if (toggle === 'open') {
				this._showOverlay(board);
				return;
			}
			if (toggle === 'close') {
				if (this._overlayElement && this._overlayMode === 'leaderboard') this._hideOverlay();
				return;
			}
			if (this._overlayElement && this._overlayMode === 'leaderboard' && this._overlayContext && this._overlayContext.board === board) {
				this._hideOverlay();
			} else {
				this._showOverlay(board);
			}
		}

		_ensureAchievementMeta(all) {
			if (!all.__achievements_meta) all.__achievements_meta = {};
			return all.__achievements_meta;
		}
		_ensureAchievementUnlocked(all) {
			if (!all.__achievements_unlocked) all.__achievements_unlocked = {};
			return all.__achievements_unlocked;
		}

		createAchievement(args) {
			const id = String(args.ID || '');
			const name = String(args.NAME || '');
			const tag = String(args.TAG || '默认标签');
			if (!id) return;
			const all = this._loadAll();
			const meta = this._ensureAchievementMeta(all);
			if (!meta[tag]) meta[tag] = {};
			meta[tag][id] = { name: name || id };
			this._saveAll(all);
		}

		awardAchievement(args) {
			const id = String(args.ID || '');
			const tag = String(args.TAG || '默认标签');
			const player = String(args.PLAYER || '玩家');
			const name = String(args.NAME || '');
			if (!id) return;
			const all = this._loadAll();
			const meta = this._ensureAchievementMeta(all);
			if (!meta[tag]) meta[tag] = {};
			if (name) meta[tag][id] = { name: name };
			const unlocked = this._ensureAchievementUnlocked(all);
			if (!unlocked[player]) unlocked[player] = {};
			if (!unlocked[player][tag]) unlocked[player][tag] = {};
			unlocked[player][tag][id] = { ts: Date.now() };
			this._saveAll(all);
			const display = String((args && args.DISPLAY) || '').toLowerCase();
			if (display === 'show') {
				const displayName = (meta[tag] && meta[tag][id] && meta[tag][id].name) ? meta[tag][id].name : (name || id);
				this._showDynamicHint('🏆 ' + this._t('unlocked') + ': ' + displayName);
			}
		}

		isAchievementUnlocked(args) {
			const id = String(args.ID || '');
			const tag = String(args.TAG || '默认标签');
			const player = String(args.PLAYER || '玩家');
			if (!id) return false;
			const all = this._loadAll();
			const unlocked = all.__achievements_unlocked || {};
			return !!(unlocked[player] && unlocked[player][tag] && unlocked[player][tag][id]);
		}

		resetAllAchievements() {
			const all = this._loadAll();
			if (all.__achievements_meta) delete all.__achievements_meta;
			if (all.__achievements_unlocked) delete all.__achievements_unlocked;
			this._saveAll(all);
		}

		_ensureStyles() {
			if (this._stylesInjected || typeof document === 'undefined') {
				if (typeof document !== 'undefined' && document.getElementById && document.getElementById('turbo-leaderboard-styles')) {
					this._stylesInjected = true;
				}
				return;
			}
			const css = `
				#turbo-leaderboard-overlay {
					position: fixed;
					right: 12px;
					top: 12px;
					max-height: 70vh;
					overflow: auto;
					z-index: 999999;
					background: rgba(255,255,255,0.5);
					color: #111;
					padding: 12px;
					border-radius: 12px;
					font-family: "Helvetica Neue", Arial, sans-serif;
					font-size: 13px;
					min-width: 300px;
					box-shadow: 0 8px 24px rgba(0,0,0,0.12);
					backdrop-filter: blur(4px);
					border: 1px solid rgba(0,0,0,0.06);
				}
				#turbo-leaderboard-overlay .lb-title {
					display:flex;
					align-items:center;
					justify-content:space-between;
					gap:8px;
					margin-bottom:8px;
				}
				#turbo-leaderboard-overlay .lb-title .title-text {
					font-weight:700;
					font-size:14px;
					color: #222;
				}
				#turbo-leaderboard-overlay .lb-controls button {
					background: rgba(0,0,0,0.04);
					border: 1px solid rgba(0,0,0,0.06);
					color: #111;
					padding:4px 8px;
					border-radius:6px;
					cursor:pointer;
					font-size:12px;
				}
				#turbo-leaderboard-overlay table.lb-table {
					width:100%;
					border-collapse:collapse;
					table-layout:fixed;
				}
				#turbo-leaderboard-overlay table.lb-table th,
				#turbo-leaderboard-overlay table.lb-table td {
					padding:6px 8px;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
					color: #111;
				}
				#turbo-leaderboard-overlay table.lb-table th.rank,
				#turbo-leaderboard-overlay table.lb-table td.rank {
					width:40px;
					text-align:left;
				}
				#turbo-leaderboard-overlay table.lb-table td.name {
					text-align:left;
				}
				#turbo-leaderboard-overlay table.lb-table td.score {
					width:70px;
					text-align:right;
					font-weight:600;
				}
				#turbo-leaderboard-overlay .lb-row:nth-child(odd){
					background: rgba(0,0,0,0.02);
				}
				#turbo-leaderboard-overlay .badge {
					display:inline-block;
					min-width:24px;
					padding:2px 6px;
					border-radius:12px;
					font-weight:700;
					font-size:12px;
					text-align:center;
					margin-right:6px;
				}
				#turbo-leaderboard-overlay .badge.gold{ background: linear-gradient(90deg,#ffd700,#ffdd66); color:#1b1b1b; }
				#turbo-leaderboard-overlay .badge.silver{ background: linear-gradient(90deg,#e6e6e6,#cfcfcf); color:#1b1b1b; }
				#turbo-leaderboard-overlay .badge.bronze{ background: linear-gradient(90deg,#cd7f32,#d99b6a); color:#fff; }
				#turbo-leaderboard-overlay .name-wrap { max-width: 140px; display:inline-block; vertical-align:middle; }
				#turbo-leaderboard-overlay .achv-unlocked { color: #2e7d32; font-weight:700; }
				#turbo-leaderboard-overlay .achv-locked { color: #7b7b7b; }
			`;
			const style = document.createElement('style');
			style.id = 'turbo-leaderboard-styles';
			style.textContent = css;
			document.head.appendChild(style);
			this._stylesInjected = true;
		}

		_createOverlay() {
			this._ensureStyles();
			const el = document.createElement('div');
			el.id = 'turbo-leaderboard-overlay';
			el.style.display = 'none';

			const titleBar = document.createElement('div');
			titleBar.className = 'lb-title';
			const titleText = document.createElement('div');
			titleText.className = 'title-text';
			titleText.textContent = '';
			titleBar.appendChild(titleText);

			const controls = document.createElement('div');
			controls.className = 'lb-controls';
			const refreshBtn = document.createElement('button');
			refreshBtn.textContent = '🏆 ' + this._t('refresh');
			refreshBtn.onclick = () => {
				if (this._overlayMode === 'leaderboard' && this._overlayContext) this._showOverlay(this._overlayContext.board);
				else if (this._overlayMode === 'achievements' && this._overlayContext) this._showAchievements(this._overlayContext.tag, this._overlayContext.player);
			};
			const closeBtn = document.createElement('button');
			closeBtn.textContent = '🏆 ' + this._t('close');
			closeBtn.onclick = () => this._hideOverlay();
			controls.appendChild(refreshBtn);
			controls.appendChild(closeBtn);
			titleBar.appendChild(controls);
			el.appendChild(titleBar);

			const table = document.createElement('table');
			table.className = 'lb-table';
			const thead = document.createElement('thead');
			const htr = document.createElement('tr');
			const thRank = document.createElement('th'); thRank.className = 'rank'; thRank.textContent = '#';
			const thName = document.createElement('th'); thName.textContent = '🏆 ' + this._t('nameHeader');
			const thRight = document.createElement('th'); thRight.className = 'score'; thRight.textContent = '';
			htr.appendChild(thRank); htr.appendChild(thName); htr.appendChild(thRight);
			thead.appendChild(htr);
			table.appendChild(thead);
			const tbody = document.createElement('tbody');
			tbody.className = 'lb-list';
			table.appendChild(tbody);
			el.appendChild(table);
			el._titleText = titleText;
			el._theadRight = thRight;
			el._tbody = tbody;
			return el;
		}

		_showOverlay(board) {
			const all = this._loadAll();
			const b = all[board] || {};
			const arr = Object.keys(b).map(name => ({ name, score: Number(b[name].score), ts: Number(b[name].ts) }));
			arr.sort((a, c) => {
				if (c.score !== a.score) return c.score - a.score;
				return a.ts - c.ts;
			});
			if (!this._overlayElement) {
				this._overlayElement = this._createOverlay();
				document.body.appendChild(this._overlayElement);
			}
			this._overlayMode = 'leaderboard';
			this._overlayContext = { board };
			this._overlayElement._titleText.textContent = '🏆 ' + this._t('leaderboardTitle', { board });
			this._overlayElement._theadRight.textContent = '🏆 ' + this._t('scoreHeader');
			const tbody = this._overlayElement._tbody;
			tbody.innerHTML = '';
			if (arr.length === 0) {
				const tr = document.createElement('tr');
				const td = document.createElement('td');
				td.colSpan = 3;
				td.style.opacity = '0.85';
				td.textContent = '🏆 ' + this._t('noData');
				tr.appendChild(td);
				tbody.appendChild(tr);
			} else {
				const max = Math.min(50, arr.length);
				for (let i = 0; i < max; i++) {
					const it = arr[i];
					const tr = document.createElement('tr');
					tr.className = 'lb-row';
					const tdRank = document.createElement('td'); tdRank.className = 'rank';
					const badge = document.createElement('span'); badge.className = 'badge';
					if (i === 0) badge.classList.add('gold'); else if (i === 1) badge.classList.add('silver'); else if (i === 2) badge.classList.add('bronze');
					badge.textContent = (i + 1);
					tdRank.appendChild(badge);
					tr.appendChild(tdRank);
					const tdName = document.createElement('td'); tdName.className = 'name';
					const nameWrap = document.createElement('span'); nameWrap.className = 'name-wrap'; nameWrap.title = it.name; nameWrap.textContent = it.name;
					tdName.appendChild(nameWrap);
					tr.appendChild(tdName);
					const tdScore = document.createElement('td'); tdScore.className = 'score'; tdScore.textContent = String(it.score);
					tr.appendChild(tdScore);
					tbody.appendChild(tr);
				}
				if (arr.length > max) {
					const tr = document.createElement('tr');
					const td = document.createElement('td'); td.colSpan = 3; td.style.opacity = '0.8';
					td.textContent = '🏆 ' + this._t('moreRecords', { n: arr.length - max });
					tr.appendChild(td);
					tbody.appendChild(tr);
				}
			}
			this._overlayElement.style.display = 'block';
		}
		
		_showAchievements(tag, player) {
			const all = this._loadAll();
			const meta = (all.__achievements_meta && all.__achievements_meta[tag]) ? all.__achievements_meta[tag] : {};
			const unlockedForPlayer = (all.__achievements_unlocked && all.__achievements_unlocked[player] && all.__achievements_unlocked[player][tag]) ? all.__achievements_unlocked[player][tag] : {};
			if (!this._overlayElement) {
				this._overlayElement = this._createOverlay();
				document.body.appendChild(this._overlayElement);
			}
			this._overlayMode = 'achievements';
			this._overlayContext = { tag, player };
			this._overlayElement._titleText.textContent = '🏆 ' + this._t('achievementsTitle', { tag, player });
			this._overlayElement._theadRight.textContent = '';
			const tbody = this._overlayElement._tbody;
			tbody.innerHTML = '';
			const ids = Object.keys(meta);
			if (ids.length === 0) {
				const tr = document.createElement('tr');
				const td = document.createElement('td'); td.colSpan = 3; td.style.opacity = '0.85'; td.textContent = '🏆 ' + this._t('noAchievements');
				tr.appendChild(td); tbody.appendChild(tr);
			} else {
				for (let i = 0; i < ids.length; i++) {
					const id = ids[i];
					const m = meta[id];
					const tr = document.createElement('tr'); tr.className = 'lb-row';
					const tdRank = document.createElement('td'); tdRank.className = 'rank'; tdRank.textContent = (i + 1) + '.';
					tr.appendChild(tdRank);
					const tdName = document.createElement('td'); tdName.className = 'name';
					const nameWrap = document.createElement('span'); nameWrap.className = 'name-wrap'; nameWrap.title = `${m.name} (${id})`; nameWrap.textContent = m.name;
					tdName.appendChild(nameWrap); tr.appendChild(tdName);
					const tdState = document.createElement('td'); tdState.className = 'score';
					if (unlockedForPlayer && unlockedForPlayer[id]) {
						tdState.innerHTML = `<span class="achv-unlocked">${'🏆 ' + this._t('unlocked')}</span>`;
					} else {
						tdState.innerHTML = `<span class="achv-locked">${'🏆 ' + this._t('locked')}</span>`;
					}
					tr.appendChild(tdState);
					tbody.appendChild(tr);
				}
			}
			this._overlayElement.style.display = 'block';
		}

		_hideOverlay() {
			if (this._overlayElement) {
				this._overlayElement.style.display = 'none';
				this._overlayMode = null;
				this._overlayContext = null;
			}
		}
		_hideDocOverlay() {
			try {
				const el = (typeof document !== 'undefined') ? document.getElementById('turbo-doc-overlay') : null;
				if (el && el.parentNode) el.parentNode.removeChild(el);
			} catch (e) {}
		}
		_openUrl(url) {
			if (typeof window === 'undefined') return;
			try {
				let opened = null;
				try { opened = window.open(url, '_blank', 'noopener'); } catch (e) { opened = null; }
				if (opened) { try { opened.opener = null; opened.focus && opened.focus(); } catch (e) {} return; }
				try {
					if (window.top && window.top !== window) {
						let to = null;
						try { to = window.top.open(url, '_blank', 'noopener'); } catch (e) { to = null; }
						if (to) { try { to.opener = null; to.focus && to.focus(); } catch (e) {} return; }
					}
				} catch (e) {}
				try {
					if (typeof document !== 'undefined') {
						const a = document.createElement('a');
						a.href = url;
						a.target = '_blank';
						a.rel = 'noopener noreferrer';
						a.style.display = 'none';
						document.body.appendChild(a);
						try {
							const evt = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
							a.dispatchEvent(evt);
						} catch (e) {
							try { a.click(); } catch (e2) {}
						}
						document.body.removeChild(a);
						return;
					}
				} catch (e) {}
				try { window.location.assign(url); } catch (e) {}
			} catch (e) {}
		}
		_showDynamicHint(msg) {
			if (typeof document === 'undefined') return;
			try {
				if (!document.getElementById('turbo-achv-hint-styles')) {
					const s = document.createElement('style');
					s.id = 'turbo-achv-hint-styles';
					s.textContent = '.turbo-achv-hint{position:fixed;left:50%;transform:translateX(-50%) translateY(-8px);top:12px;background:rgba(0,0,0,0.78);color:#fff;padding:8px 12px;border-radius:10px;font-family:"Helvetica Neue",Arial,sans-serif;font-size:13px;z-index:1000000;opacity:0;transition:opacity 0.28s ease,transform 0.28s ease;pointer-events:none;box-shadow:0 6px 18px rgba(0,0,0,0.2)}.turbo-achv-hint.show{opacity:1;transform:translateX(-50%) translateY(0)}';
					document.head.appendChild(s);
				}
				let el = document.getElementById('turbo-achv-hint');
				if (!el) {
					el = document.createElement('div');
					el.id = 'turbo-achv-hint';
					el.className = 'turbo-achv-hint';
					document.body.appendChild(el);
				}
				el.textContent = String(msg || '');
				void el.offsetWidth;
				el.classList.add('show');
				if (el._timeout) clearTimeout(el._timeout);
				el._timeout = setTimeout(function () {
					el.classList.remove('show');
				}, 3000);
			} catch (e) {}
		}
		toggleAchievementsDisplay(args) {
			const toggle = String((args.TOGGLE || '')).toLowerCase();
			const tag = String(args.TAG || '默认标签').trim();
			const player = String(args.PLAYER || '玩家').trim();
			if (toggle === 'open') {
				this._showAchievements(tag, player);
				return;
			}
			if (toggle === 'close') {
				if (this._overlayElement && this._overlayMode === 'achievements') this._hideOverlay();
				return;
			}
			if (this._overlayElement && this._overlayMode === 'achievements' && this._overlayContext && this._overlayContext.tag === tag && this._overlayContext.player === player) {
				this._hideOverlay();
			} else {
				this._showAchievements(tag, player);
			}
		}
	}

	(function registerFlexible() {
		try {
			if (typeof window !== 'undefined') {
				if (window.Scratch && window.Scratch.extensions && typeof window.Scratch.extensions.register === 'function') {
					try {
						window.Scratch.extensions.register(new Leaderboard());
						return;
					} catch (e) {
						console.error('Leaderboard: error while registering with Scratch.extensions.register:', e);
					}
				}
				// attach to window for manual registration or debugging
				try { window.LeaderboardExtension = new Leaderboard(); } catch (e) { console.error('Leaderboard: cannot create instance on window:', e); }
			}
			if (typeof module !== 'undefined' && module.exports) {
				try { module.exports = Leaderboard; } catch (e) { /* ignore */ }
			}
	} catch (e) {
		try { console.error('Leaderboard: unexpected error during registration:', e); } catch (e2) {}
	}
	})();
})();

